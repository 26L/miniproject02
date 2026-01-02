# Docker Deployment Guide

이 문서는 **News Insight Pro**를 도커(Docker) 컨테이너 환경에서 빌드하고 실행하는 방법을 설명합니다. 도커를 사용하면 OS 환경에 상관없이 동일한 실행 환경을 보장받을 수 있습니다.

---

## 1. 사전 준비 (Prerequisites)

- **Docker Desktop** 설치 및 실행 (Windows/Mac)
- **Docker & Docker Compose** 설치 (Linux)

---

## 2. 프로젝트 구성

본 프로젝트는 두 개의 서비스로 구성됩니다.
- **Backend (API):** Python FastAPI (`news-insight-backend`) - Port 8000
- **Frontend (UI):** React + Nginx (`news-insight-frontend`) - Port 80

---

## 3. 실행 방법 (Quick Start)

터미널에서 프로젝트 루트 디렉토리로 이동한 후 아래 명령어를 실행합니다.

### 3.1. 서비스 빌드 및 실행
```bash
docker-compose up --build -d
```
- `-d`: 백그라운드에서 실행 (Detached mode)

### 3.2. 서비스 중지
```bash
docker-compose down
```

---

## 4. 환경 변수 설정

도커 실행 전 `backend/.env` 파일에 유효한 API 키가 설정되어 있어야 합니다.

```env
OPENAI_API_KEY="your_key"
NEWS_API_KEY="your_key"
USE_MOCK_DATA=False
DATABASE_URL="sqlite+aiosqlite:///./news_insight.db"
```

---

## 5. 접속 정보

- **Web UI:** [http://localhost](http://localhost) (기본 80 포트)
- **API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 6. 주요 특징 및 관리

### 6.1. 데이터 보존 (Persistence)
- SQLite 데이터베이스 파일(`news_insight.db`)은 호스트의 `backend/` 폴더와 컨테이너 내부가 볼륨으로 연결되어 있어, 컨테이너를 삭제해도 데이터가 유지됩니다.

### 6.2. 프록시 설정 (Nginx)
- 프론트엔드 컨테이너 내부의 Nginx가 `/api/v1`으로 들어오는 요청을 백엔드 컨테이너의 8000번 포트로 자동 전달합니다.

### 6.3. 로그 확인
```bash
# 전체 로그 확인
docker-compose logs -f

# 특정 서비스 로그 확인
docker-compose logs -f backend
```

---

## 7. 트러블슈팅 (Troubleshooting)

1. **포트 충돌:** 만약 로컬에서 이미 80번이나 8000번 포트를 사용 중이라면, `docker-compose.yml`에서 왼쪽 포트 번호를 수정하세요 (예: `"8080:80"`).
2. **API 키 오류:** 실데이터 모드에서 분석이 안 된다면 `docker-compose logs backend`를 통해 API 키 인증 오류가 발생하는지 확인하세요.
3. **변경 사항 미반영:** 코드를 수정했는데 컨테이너에 반영되지 않는다면 `--build` 옵션을 붙여 다시 실행하세요.

---
최종 수정일: 2026-01-02