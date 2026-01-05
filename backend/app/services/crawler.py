from datetime import datetime, timedelta
from typing import List, Optional
from newsapi import NewsApiClient
from newsapi.newsapi_exception import NewsAPIException
from app.core.config import settings
from app.schemas.news import NewsCreate
from app.utils.text import TextProcessor

class NewsCrawler:
    """
    NewsAPI Python 라이브러리를 사용한 뉴스 크롤러
    https://github.com/mattlisiv/newsapi-python
    """
    
    def __init__(self):
        self._client: Optional[NewsApiClient] = None
    
    @property
    def client(self) -> Optional[NewsApiClient]:
        """NewsApiClient 인스턴스를 반환 (Lazy initialization)"""
        if self._client is None and settings.NEWS_API_KEY:
            self._client = NewsApiClient(api_key=settings.NEWS_API_KEY)
        return self._client

    async def search_news(
        self, 
        query: str, 
        from_date: Optional[str] = None,
        to_date: Optional[str] = None,
        language: str = "en",
        sort_by: str = "publishedAt",
        page_size: int = 20
    ) -> List[NewsCreate]:
        """
        키워드로 뉴스를 검색합니다.
        
        Args:
            query: 검색 키워드
            from_date: 시작 날짜 (YYYY-MM-DD)
            to_date: 종료 날짜 (YYYY-MM-DD)
            language: 언어 코드 ('en', 'ko' 등)
            sort_by: 정렬 기준 ('relevancy', 'popularity', 'publishedAt')
            page_size: 결과 개수 (최대 100)
        """
        if settings.USE_MOCK_DATA:
            print(f"[MOCK] Returning mock news data for query: {query}")
            return self._get_mock_news(query)

        return await self._fetch_from_api(
            query=query,
            from_date=from_date,
            to_date=to_date,
            language=language,
            sort_by=sort_by,
            page_size=page_size
        )

    async def get_top_headlines(
        self,
        country: str = "us",
        category: Optional[str] = None,
        page_size: int = 20
    ) -> List[NewsCreate]:
        """
        인기 헤드라인 뉴스를 가져옵니다.
        
        Args:
            country: 국가 코드 ('us', 'kr' 등)
            category: 카테고리 ('business', 'technology', 'sports' 등)
            page_size: 결과 개수
        """
        if settings.USE_MOCK_DATA:
            print(f"[MOCK] Returning mock headlines for country: {country}")
            return self._get_mock_news("headlines")
        
        if not self.client:
            print("[WARNING] No API Key found. Fallback to Mock data.")
            return self._get_mock_news("headlines")
        
        try:
            response = self.client.get_top_headlines(
                country=country,
                category=category,
                page_size=page_size
            )
            
            return self._parse_articles(response.get("articles", []))
            
        except NewsAPIException as e:
            print(f"[ERROR] NewsAPI get_top_headlines failed: {e}")
            raise e
        except Exception as e:
            print(f"[ERROR] Unexpected error in get_top_headlines: {e}")
            return self._get_mock_news("headlines")

    async def _fetch_from_api(
        self, 
        query: str,
        from_date: Optional[str] = None,
        to_date: Optional[str] = None,
        language: str = "en",
        sort_by: str = "publishedAt",
        page_size: int = 20
    ) -> List[NewsCreate]:
        """NewsAPI Python 라이브러리를 사용하여 뉴스 검색"""
        
        if not self.client:
            print("[WARNING] No API Key found. Fallback to Mock data.")
            return self._get_mock_news(query)

        # 날짜 기본값 설정 (최근 7일)
        if not to_date:
            to_date = datetime.now().strftime("%Y-%m-%d")
        if not from_date:
            from_date = (datetime.now() - timedelta(days=7)).strftime("%Y-%m-%d")

        try:
            # newsapi-python 라이브러리 사용
            response = self.client.get_everything(
                q=query,
                from_param=from_date,
                to=to_date,
                language=language,
                sort_by=sort_by,
                page_size=page_size
            )
            
            articles = response.get("articles", [])
            print(f"[NewsAPI] Found {len(articles)} articles for query: {query}")
            
            return self._parse_articles(articles)
            
        except NewsAPIException as e:
            print(f"[ERROR] NewsAPI request failed: {e}")
            raise e
        except Exception as e:
            print(f"[ERROR] Unexpected error: {e}")
            return self._get_mock_news(query)

    def _parse_articles(self, articles: list) -> List[NewsCreate]:
        """NewsAPI 응답을 NewsCreate 객체로 변환"""
        result = []
        
        for article in articles:
            if not article.get("url") or not article.get("title"):
                continue
                
            # published_at 파싱
            published_at = datetime.now()
            if article.get("publishedAt"):
                try:
                    published_at = datetime.fromisoformat(
                        article["publishedAt"].replace("Z", "+00:00")
                    )
                except ValueError:
                    pass
            
            result.append(NewsCreate(
                title=TextProcessor.clean_text(article.get("title", "No Title")),
                url=article.get("url", ""),
                content=TextProcessor.clean_text(
                    article.get("content") or article.get("description", "")
                ),
                image_url=article.get("urlToImage"),
                published_at=published_at,
                # 아래 필드는 AI 분석 후 채워짐
                summary=article.get("description"),  # 초기에는 description을 summary로 사용
                sentiment_label=None,
                sentiment_score=None,
                keywords=[]
            ))
        
        return result

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
                summary=None,  # AI 분석 버튼 테스트용
                sentiment_label=None,
                sentiment_score=None,
                keywords=[]
            ),
        ]


# 싱글톤 인스턴스
crawler = NewsCrawler()
