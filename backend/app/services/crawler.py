import httpx
from datetime import datetime
from typing import List
from app.core.config import settings
from app.schemas.news import NewsCreate
from app.utils.text import TextProcessor

class NewsCrawler:
    BASE_URL = "https://newsapi.org/v2/everything"


    async def search_news(self, query: str) -> List[NewsCreate]:
        """
        키워드로 뉴스를 검색합니다.
        settings.USE_MOCK_DATA가 True이면 가짜 데이터를 반환합니다.
        """
        if settings.USE_MOCK_DATA:
            print(f"[MOCK] Returning mock news data for query: {query}")
            return self._get_mock_news(query)

        return await self._fetch_from_api(query)

    async def _fetch_from_api(self, query: str) -> List[NewsCreate]:
        if not settings.NEWS_API_KEY:
             # 키가 없으면 안전하게 Mock으로 폴백하거나 에러 발생
            print("[WARNING] No API Key found. Fallback to Mock data.")
            return self._get_mock_news(query)

        params = {
            "q": query,
            "apiKey": settings.NEWS_API_KEY,
            "language": "en", # or 'ko'
            "sortBy": "publishedAt",
            "pageSize": 10
        }

        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(self.BASE_URL, params=params)
                response.raise_for_status()
                data = response.json()
                
                articles = data.get("articles", [])
                return [
                    NewsCreate(
                        title=TextProcessor.clean_text(article.get("title", "No Title")),
                        url=article.get("url", ""),
                        content=TextProcessor.clean_text(article.get("content") or article.get("description", "")),
                        image_url=article.get("urlToImage"),
                        published_at=datetime.fromisoformat(article["publishedAt"].replace("Z", "+00:00")) if article.get("publishedAt") else datetime.now()
                    )
                    for article in articles
                    if article.get("url") and article.get("title") # 필수 필드 체크
                ]
            except Exception as e:
                print(f"[ERROR] NewsAPI request failed: {e}")
                return []

    def _get_mock_news(self, query: str) -> List[NewsCreate]:
        """UI 개발 및 테스트를 위한 가짜 데이터"""
        return [
            NewsCreate(
                title=f"'{query}' Market Outlook: Positive Trends Ahead",
                url=f"https://example.com/news/1/{query}",
                content=f"Recent analysis shows that {query} is gaining significant traction in the global market...",
                image_url="https://picsum.photos/seed/news1/600/400",
                published_at=datetime.now()
            ),
            NewsCreate(
                title=f"Global Updates on {query}",
                url=f"https://example.com/news/2/{query}",
                content=f"Experts discuss the impact of {query} on the economy. Several key factors are involved...",
                image_url="https://picsum.photos/seed/news2/600/400",
                published_at=datetime.now()
            ),
            NewsCreate(
                title=f"Why {query} Matters in 2025",
                url=f"https://example.com/news/3/{query}",
                content=f"A deep dive into why {query} is becoming a household name this year...",
                image_url="https://picsum.photos/seed/news3/600/400",
                published_at=datetime.now()
            ),
        ]

crawler = NewsCrawler()
