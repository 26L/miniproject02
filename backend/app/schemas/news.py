from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field, HttpUrl

# 공통 속성
class NewsBase(BaseModel):
    title: str
    url: str
    content: Optional[str] = None
    image_url: Optional[str] = None
    published_at: Optional[datetime] = None

# 뉴스 생성 (크롤링/검색 결과 저장)
class NewsCreate(NewsBase):
    pass

# AI 분석 결과 업데이트
class NewsAnalysisUpdate(BaseModel):
    summary: str
    sentiment_label: str
    sentiment_score: Optional[float] = None
    keywords: list[str] = [] # Top 5 Keywords

# 클라이언트 응답 (DB 조회)
class NewsResponse(NewsBase):
    id: int
    summary: Optional[str] = None
    sentiment_label: Optional[str] = None
    sentiment_score: Optional[float] = None
    keywords: list[str] = []
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
