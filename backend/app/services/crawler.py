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
                raise e # Re-raise to be handled by the endpoint or middleware

    def _get_mock_news(self, query: str) -> List[NewsCreate]:
        """UI 개발 및 테스트를 위한 가짜 데이터 (한국어)"""
        return [
            NewsCreate(
                title=f"'{query}' 시장 전망: 긍정적인 추세 지속",
                url=f"https://example.com/news/1/{query}",
                content=f"최근 분석에 따르면 {query} 시장이 글로벌 시장에서 큰 주목을 받고 있습니다. 전문가들은...",
                image_url="https://picsum.photos/seed/news1/600/400",
                published_at=datetime.now(),
                summary=f"이 기사는 {query}를 둘러싼 긍정적인 시장 동향을 다룹니다. 분석가들은 채택 증가와 호의적인 경제 여건으로 인해 향후 분기에 강력한 성장을 예측합니다.",
                sentiment_label="positive",
                sentiment_score=0.85,
                keywords=[query, "시장", "성장", "트렌드"]
            ),
            NewsCreate(
                title=f"{query}에 대한 글로벌 업데이트",
                url=f"https://example.com/news/2/{query}",
                content=f"전문가들이 {query}가 경제에 미치는 영향에 대해 논의합니다. 여러 가지 주요 요인이 관련되어 있으며...",
                image_url="https://picsum.photos/seed/news2/600/400",
                published_at=datetime.now(),
                summary=f"글로벌 전문가들이 {query}의 경제적 영향에 대해 의견을 제시합니다. 주요 요인으로는 규제 변화와 국제 무역 역학이 포함됩니다.",
                sentiment_label="neutral",
                sentiment_score=0.1,
                keywords=[query, "경제", "글로벌", "영향"]
            ),
            NewsCreate(
                title=f"2026년, 왜 {query}가 중요한가?",
                url=f"https://example.com/news/3/{query}",
                content=f"올해 {query}가 왜 누구나 아는 이름이 되고 있는지에 대한 심층 분석...",
                image_url="https://picsum.photos/seed/news3/600/400",
                published_at=datetime.now(),
                summary=None, # 분석 버튼 테스트를 위해 비워둠
                sentiment_label=None,
                sentiment_score=None,
                keywords=[]
            ),
        ]

crawler = NewsCrawler()
