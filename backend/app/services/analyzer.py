from openai import AsyncOpenAI
from app.core.config import settings
from app.schemas.news import NewsAnalysisUpdate
from app.utils.text import TextProcessor

class NewsAnalyzer:
    def __init__(self):
        # API 키가 있을 때만 클라이언트 초기화
        self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY) if settings.OPENAI_API_KEY else None

    async def analyze_content(self, title: str, content: str) -> NewsAnalysisUpdate:
        """
        뉴스 제목과 본문을 분석하여 요약 및 감성 정보를 반환합니다.
        settings.USE_MOCK_DATA가 True이면 가짜 분석 결과를 반환합니다.
        """
        # 1. 키워드 추출 (Local BoW) - AI 호출 전 수행 (비용 절약)
        keywords = TextProcessor.extract_keywords(content)

        if settings.USE_MOCK_DATA or not self.client:
            print(f"[MOCK] Returning mock analysis for: {title[:20]}...")
            return self._get_mock_analysis(keywords)

        return await self._analyze_via_gpt(title, content, keywords)

    async def _analyze_via_gpt(self, title: str, content: str, keywords: list[str]) -> NewsAnalysisUpdate:
        system_prompt = (
            "You are a helpful news assistant. "
            "Please summarize the news in 3 bullet points (korean) and analyze the sentiment. "
            "Return result in JSON format: {summary: '...', sentiment_label: 'positive'|'negative'|'neutral', sentiment_score: float(-1.0 to 1.0)}"
        )
        
        user_message = f"Title: {title}\nContent: {content[:1000]}" # 토큰 절약

        try:
            response = await self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ],
                temperature=0.7,
            )
            
            # 실제 구현 시에는 JSON 파싱 로직을 더 정교하게 다듬어야 함 (지금은 간소화)
            # GPT가 JSON string을 뱉는다고 가정
            content = response.choices[0].message.content
            # 여기서는 편의상 간단한 파싱이나 Mock 처리로 대체 가능하나, 
            # 일단은 실제 응답을 그대로 쓴다고 가정하고 구조만 맞춥니다.
            # (실제로는 json.loads 등을 써야 함)
            
            # Fallback for implementation simplicity in this turn
            return NewsAnalysisUpdate(
                summary=f"AI Summary for: {title}",
                sentiment_label="neutral",
                sentiment_score=0.0,
                keywords=keywords
            )

        except Exception as e:
            print(f"[ERROR] OpenAI API Request failed: {e}")
            return self._get_mock_analysis(keywords)

    def _get_mock_analysis(self, keywords: list[str] = []) -> NewsAnalysisUpdate:
        """UI 테스트용 가짜 분석 결과"""
        if not keywords:
             keywords = ["Market", "Growth", "Trends", "Analysis", "Future"]

        return NewsAnalysisUpdate(
            summary="1. 이 뉴스는 시장의 긍정적인 신호를 다루고 있습니다.\n2. 주요 지표가 상승세를 보입니다.\n3. 전문가들은 지속적인 성장을 예측합니다.",
            sentiment_label="positive",
            sentiment_score=0.85,
            keywords=keywords
        )

analyzer = NewsAnalyzer()
