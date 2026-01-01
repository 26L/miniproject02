# Docker Deployment Guide (Service & Server Environment)

본 문서는 **News Insight Pro** 서비스를 Docker를 사용하여 로컬 및 서버 환경에 배포하는 방법을 상세히 설명합니다.

---

## 1. 배포 아키텍처 (Deployment Architecture)

Docker Compose를 사용하여 **Frontend(Nginx)** 와 **Backend(FastAPI)** 두 개의 컨테이너를 통합 관리합니다.

- **Frontend Container (`frontend`)**:
    - `nginx:alpine` 기반
    - React 정적 빌드 파일(`dist/`) 서빙
    - 포트 `80` 노출
    - `/api/v1` 요청을 Backend 컨테이너로 리버스 프록시 (CORS 문제 해결)
- **Backend Container (`backend`)**:
    - `python:3.11-slim` 기반
    - FastAPI 서버 실행 (`uvicorn`)
    - 포트 `8000` 노출 (내부 통신 및 디버깅용)
    - SQLite 데이터베이스 파일 볼륨 마운트 (데이터 영구 보존)

---

## 2. 사전 준비 (Prerequisites)

서버(또는 로컬 PC)에 다음 도구들이 설치되어 있어야 합니다.

1.  **Docker Engine:** [설치 가이드](https://docs.docker.com/engine/install/)
2.  **Docker Compose:** (최신 Docker Desktop/Plugin에는 기본 포함)
3.  **Git:** 소스 코드 다운로드용

---

## 3. 배포 설정 (Configuration)

### 3.1. 환경 변수 설정
`backend` 디렉토리 내의 `.env` 파일을 확인하고, 실제 서버용 키 값을 입력합니다.

```bash
# backend/.env
OPENAI_API_KEY="sk-..."
NEWS_API_KEY="..."
DATABASE_URL="sqlite:///./news_insight.db"
```

### 3.2. 프론트엔드 환경 설정
`frontend/.env.production` 파일이 자동으로 사용됩니다. Nginx 프록시를 사용하므로 상대 경로로 설정되어 있습니다.

```env
# frontend/.env.production
VITE_API_BASE_URL=/api/v1
```

---

## 4. 실행 및 배포 (Execution)

프로젝트 루트(`C:\newsapi\`)에서 다음 명령어를 실행합니다.

### 4.1. 서비스 시작 (Start)
이미지를 빌드하고 백그라운드 모드(`-d`)로 실행합니다.

```bash
docker-compose up -d --build
```

### 4.2. 상태 확인 (Check Status)
컨테이너가 정상적으로 실행 중인지 확인합니다.

```bash
docker-compose ps
```

### 4.3. 로그 확인 (View Logs)
문제가 발생했을 때 로그를 확인합니다.

```bash
# 전체 로그 확인
docker-compose logs -f

# 특정 서비스 로그 확인
docker-compose logs -f backend
```

### 4.4. 서비스 중지 (Stop)

```bash
docker-compose down
```

---

## 5. 접속 방법 (Access)

- **웹 서비스 (Frontend):** `http://localhost` (또는 서버 IP)
    - 사용자는 이 주소로 접속하여 모든 기능을 사용합니다.
- **API 문서 (Backend):** `http://localhost:8000/docs`
    - 개발 및 디버깅 목적으로 접근 가능합니다.

---

## 6. 데이터 관리 (Data Persistence)

`docker-compose.yml` 설정에 의해 백엔드의 SQLite 데이터베이스 파일은 호스트 시스템과 동기화됩니다.

- **호스트 경로:** `./backend/news_insight.db`
- **컨테이너 경로:** `/app/news_insight.db`

컨테이너를 삭제(`down`)했다가 다시 실행해도 **데이터는 보존**됩니다.

---

## 7. 문제 해결 (Troubleshooting)

**Q. API 요청 시 502 Bad Gateway 에러가 뜹니다.**
- 백엔드 컨테이너가 아직 부팅 중일 수 있습니다. `docker-compose logs -f backend`로 "Application startup complete" 메시지가 떴는지 확인하세요.

**Q. "Vite" 관련 빌드 에러가 발생합니다.**
- 로컬의 `node_modules`가 도커 빌드 컨텍스트에 포함되어 충돌할 수 있습니다. `.dockerignore` 파일에 `node_modules`가 포함되어 있는지 확인하거나, 로컬 `node_modules` 삭제 후 다시 빌드해 보세요.

**Q. DB 데이터가 저장되지 않습니다.**
- `docker-compose.yml`의 `volumes` 섹션이 올바른지 확인하세요.

---
**작성일:** 2026-01-02
**작성자:** Gemini Agent
