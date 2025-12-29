from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
from app.core.config import settings

# 비동기 엔진 생성
# check_same_thread=False는 SQLite에서만 필요 (비동기 처리 시 스레드 체크 우회)
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=True, # 개발 중 쿼리 로그 확인용
    connect_args={"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {}
)

# 비동기 세션 팩토리
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)

# Base 모델 클래스
class Base(DeclarativeBase):
    pass

# Dependency Injection용 함수
async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
