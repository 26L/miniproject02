from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.db.database import engine, Base
from app.api.endpoints import news

# 앱 수명주기 관리 (DB 테이블 생성)
@asynccontextmanager
async def lifespan(app: FastAPI):
    # 시작 시 DB 테이블 생성 (비동기)
    async with engine.begin() as conn:
        # 개발 편의를 위해 매번 생성 (운영 환경에서는 Alembic 마이그레이션 권장)
        await conn.run_sync(Base.metadata.create_all)
    yield
    # 종료 시 정리 작업 (필요 시)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# CORS 설정 (프론트엔드 연동)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://127.0.0.1:5173",
        "http://localhost",
        "http://127.0.0.1",
        "http://localhost:80",
        "http://127.0.0.1:80"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(news.router, prefix=f"{settings.API_V1_STR}/news", tags=["news"])

@app.get("/")
async def root():
    return {"message": "News Insight Pro API is running!"}