import pytest
import httpx

@pytest.mark.asyncio
async def test_live_server_flow():
    base_url = "http://127.0.0.1:8000"
    
    async with httpx.AsyncClient(base_url=base_url) as client:
        # 1. Root Health Check
        health_resp = await client.get("/")
        assert health_resp.status_code == 200
        
        # 2. Search
        search_query = "Tesla"
        search_resp = await client.post("/api/v1/news/search", params={"query": search_query})
        assert search_resp.status_code == 200
        news_list = search_resp.json()
        assert len(news_list) > 0
        
        target_id = news_list[0]["id"]
        
        # 3. Analyze
        analyze_resp = await client.post(f"/api/v1/news/analysis/{target_id}")
        assert analyze_resp.status_code == 200
        analyzed_data = analyze_resp.json()
        assert analyzed_data["summary"] is not None
        assert "keywords" in analyzed_data
