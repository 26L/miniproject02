import json
from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.database import get_db
from app.db.models import News
from app.schemas.news import NewsResponse, NewsCreate
from app.services.crawler import crawler
from app.services.analyzer import analyzer

router = APIRouter()

@router.post("/search", response_model=List[NewsResponse])
async def search_and_save_news(
    query: str,
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    1. 외부 API(NewsAPI)를 통해 뉴스를 검색합니다.
    2. 중복되지 않은 뉴스를 DB에 저장합니다.
    3. 저장된 뉴스 목록을 반환합니다.
    """
    # 1. 크롤링 (Mock or Real)
    try:
        scraped_news_list = await crawler.search_news(query)
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"News API connection failed: {str(e)}")
    
    saved_news = []
    
    for news_data in scraped_news_list:
        # 2. 중복 확인 (URL 기준)
        result = await db.execute(select(News).where(News.url == news_data.url))
        existing_news = result.scalars().first()
        
        if not existing_news:
            # 3. 신규 저장
            new_news = News(
                title=news_data.title,
                url=news_data.url,
                content=news_data.content,
                image_url=news_data.image_url,
                published_at=news_data.published_at,
                # Optional fields (if provided by Crawler/Mock)
                summary=news_data.summary,
                sentiment_label=news_data.sentiment_label,
                sentiment_score=news_data.sentiment_score,
                keywords=json.dumps(news_data.keywords) if news_data.keywords else None
            )
            db.add(new_news)
            await db.commit() 
            await db.refresh(new_news)
            saved_news.append(new_news)
        else:
            saved_news.append(existing_news)
            
    # 응답 모델 변환 시 keywords 처리
    responses = []
    for n in saved_news:
        # DB 객체를 딕셔너리로 변환 후 keywords 처리하여 검증
        news_dict = {c.name: getattr(n, c.name) for c in n.__table__.columns}
        news_dict['keywords'] = json.loads(n.keywords) if n.keywords else []
        responses.append(NewsResponse.model_validate(news_dict))
    return responses

@router.get("", response_model=List[NewsResponse])
async def read_news_list(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    DB에 저장된 뉴스 목록을 최신순으로 조회합니다.
    """
    query = select(News).order_by(News.created_at.desc()).offset(skip).limit(limit)
    result = await db.execute(query)
    news_list = result.scalars().all()
    
    responses = []
    for n in news_list:
        news_dict = {c.name: getattr(n, c.name) for c in n.__table__.columns}
        news_dict['keywords'] = json.loads(n.keywords) if n.keywords else []
        responses.append(NewsResponse.model_validate(news_dict))
    return responses

@router.post("/analysis/{news_id}", response_model=NewsResponse)
async def analyze_news_item(
    news_id: int,
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    특정 ID의 뉴스를 AI로 분석(요약/감성)하고 DB를 업데이트합니다.
    """
    # 1. DB 조회
    result = await db.execute(select(News).where(News.id == news_id))
    news_item = result.scalars().first()
    
    if not news_item:
        raise HTTPException(status_code=404, detail="News not found")
        
    # 2. AI 분석 수행 (Mock or Real)
    text_to_analyze = news_item.content if news_item.content else news_item.title
    analysis_result = await analyzer.analyze_content(news_item.title, text_to_analyze)
    
    # 3. 결과 업데이트 (키워드 포함)
    news_item.summary = analysis_result.summary
    news_item.sentiment_label = analysis_result.sentiment_label
    news_item.sentiment_score = analysis_result.sentiment_score
    news_item.keywords = json.dumps(analysis_result.keywords)
    
    await db.commit()
    await db.refresh(news_item)
    
    news_dict = {c.name: getattr(news_item, c.name) for c in news_item.__table__.columns}
    news_dict['keywords'] = analysis_result.keywords
    
    return NewsResponse.model_validate(news_dict)

@router.delete("/reset", status_code=204)
async def reset_db(
    db: AsyncSession = Depends(get_db)
) -> None:
    """
    DB의 모든 뉴스 데이터를 삭제합니다. (개발 및 테스트용)
    """
    from sqlalchemy import delete
    await db.execute(delete(News))
    await db.commit()
    return

