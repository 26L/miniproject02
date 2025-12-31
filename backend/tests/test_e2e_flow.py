import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.db.database import engine, Base

@pytest.fixture(scope="session", autouse=True)
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)

@pytest.mark.asyncio
async def test_full_e2e_flow():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        # 1. 검색 (Search)
        search_query = "OpenAI"
        search_response = await ac.post("/api/v1/news/search", params={"query": search_query})
        assert search_response.status_code == 200
        news_list = search_response.json()
        assert len(news_list) > 0
        
        target_news = news_list[0]
        news_id = target_news["id"]
        assert target_news["summary"] is None  # 처음엔 요약이 없어야 함
        
        # 2. 분석 (Analyze)
        analyze_response = await ac.post(f"/api/v1/news/analysis/{news_id}")
        assert analyze_response.status_code == 200
        analyzed_news = analyze_response.json()
        
        assert analyzed_news["id"] == news_id
        assert analyzed_news["summary"] is not None
        assert analyzed_news["sentiment_label"] in ["positive", "negative", "neutral"]
        assert "keywords" in analyzed_news
        assert len(analyzed_news["keywords"]) > 0

        # 3. 목록 조회 시에도 분석 결과가 유지되는지 확인
        list_response = await ac.get("/api/v1/news/")
        assert list_response.status_code == 200
        updated_list = list_response.json()
        
        # ID로 찾기
        updated_item = next((item for item in updated_list if item["id"] == news_id), None)
        assert updated_item is not None
        assert updated_item["summary"] == analyzed_news["summary"]
