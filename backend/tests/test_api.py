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

# event_loop fixture 제거 (pytest-asyncio가 자동 관리)



@pytest.mark.asyncio
async def test_read_main():

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "News Insight Pro API is running!"}

@pytest.mark.asyncio
async def test_search_news_mock():
    # Mock 데이터 테스트 (API Key가 없어도 동작해야 함)
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/api/v1/news/search", params={"query": "Bitcoin"})
    
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if len(data) > 0:
        assert "title" in data[0]
        assert "Bitcoin" in data[0]["title"] or "Bitcoin" in data[0]["url"]

@pytest.mark.asyncio
async def test_get_news_list():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/v1/news/")
    
    assert response.status_code == 200
    assert isinstance(response.json(), list)
