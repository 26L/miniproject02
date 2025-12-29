from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Float, DateTime
from sqlalchemy.sql import func
from app.db.database import Base

class News(Base):
    __tablename__ = "news"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    url = Column(String, unique=True, index=True, nullable=False)
    content = Column(Text, nullable=True) # 뉴스 본문 (전체 혹은 일부)
    image_url = Column(String, nullable=True) # 대표 이미지 URL
    
    # AI Analysis Data
    summary = Column(Text, nullable=True)
    sentiment_label = Column(String, nullable=True) # 'positive', 'negative', 'neutral'
    sentiment_score = Column(Float, nullable=True) # -1.0 ~ 1.0 (Optional)
    
    published_at = Column(DateTime(timezone=True), nullable=True) # 뉴스 원문 발행 시간
    created_at = Column(DateTime(timezone=True), server_default=func.now()) # DB 수집 시간

    def __repr__(self):
        return f"<News(id={self.id}, title='{self.title}')>"
