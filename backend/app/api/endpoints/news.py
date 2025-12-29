from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException
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
    scraped_news_list = await crawler.search_news(query)
    
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
                published_at=news_data.published_at
            )
            db.add(new_news)
            # flush를 호출하여 id를 미리 생성하지만 커밋은 나중에 한 번에 할 수도 있음
            # 여기서는 건건이 처리하여 바로 리스트에 담음
            await db.commit() 
            await db.refresh(new_news)
            saved_news.append(new_news)
        else:
            saved_news.append(existing_news)
            
    return saved_news

@router.get("/", response_model=List[NewsResponse])
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
    return news_list

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
    # 내용이 없으면 제목으로라도 분석
    text_to_analyze = news_item.content if news_item.content else news_item.title
    analysis_result = await analyzer.analyze_content(news_item.title, text_to_analyze)
    
    # 3. 결과 업데이트
    news_item.summary = analysis_result.summary
    news_item.sentiment_label = analysis_result.sentiment_label
    news_item.sentiment_score = analysis_result.sentiment_score
    # 키워드는 DB 모델에 필드가 없다면 현재는 저장하지 않거나, models.py를 수정해야 함.
    # MVP 단계에서는 스키마에는 있지만 DB에는 저장 안하거나, Response에만 섞어서 보낼 수 있음.
    # 여기서는 Response Model이 'keywords'를 가지고 있으므로, 
    # Python 객체에 임시로 할당해서 응답에는 포함되게 함 (DB 저장은 추후 확장)
    
    await db.commit()
    await db.refresh(news_item)
    
    # Pydantic 모델 변환 시 keywords 필드를 채워주기 위해 속성 주입 (DB컬럼이 아닐 경우)
    # 실제로는 DB에 keywords 컬럼을 JSON 형태로 파싱해서 넣는 것이 정석.
    # 이번 Turn에서는 API 응답에만 실어 보냄.
    news_response = NewsResponse.model_validate(news_item)
    news_response.keywords = analysis_result.keywords
    
    return news_response
