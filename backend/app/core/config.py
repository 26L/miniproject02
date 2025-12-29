import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # App
    PROJECT_NAME: str = "News Insight Pro"
    API_V1_STR: str = "/api/v1"
    
    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./news_insight.db"
    
    # External APIs
    OPENAI_API_KEY: str = ""
    NEWS_API_KEY: str = ""
    
    # Dev Mode
    USE_MOCK_DATA: bool = True # True면 외부 API 대신 Mock 데이터 사용

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore" # .env에 정의되지 않은 변수 무시
    )

settings = Settings()
