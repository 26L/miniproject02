# Backend Dockerfile
FROM python:3.11-slim

WORKDIR /app

# 시스템 의존성 설치 (필요 시)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# 의존성 설치
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 소스 코드 복사
COPY . .

# 환경 변수 설정
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

# 실행 (기본 포트 8000)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
