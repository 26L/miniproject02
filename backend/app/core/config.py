import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    """
    애플리케이션의 모든 설정 값을 관리하는 클래스입니다.
    .env 파일로부터 값을 읽어오며, 값이 없을 경우 기본값을 사용합니다.
    """
    
    # [App]
    PROJECT_NAME: str = "News Insight Pro"
    API_V1_STR: str = "/api/v1"
    
    # [Database]
    DATABASE_URL: str = "sqlite+aiosqlite:///./news_insight.db"
    
    # [External APIs]
    OPENAI_API_KEY: str = ""
    NEWS_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o-mini"
    
    # [Mode]
    # True: 가짜 데이터 사용, False: 실제 API 사용
    USE_MOCK_DATA: bool = False 

    # Pydantic 설정: .env 파일을 읽어오도록 구성
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

settings = Settings()