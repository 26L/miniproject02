# [Project] News Insight Pro - Master TODO List

## 0. 환경 설정 및 문서화 (Environment & Docs)
> **상태:** ✅ 완료

- [x] **프로젝트 구조 생성**
    - [x] Root 폴더 생성 (`news-insight-pro`)
    - [x] 하위 폴더 생성: `backend`, `frontend`, `docs`
    - [x] `PROJECT_CONTEXT.md` 파일 생성 (시스템 설계 내용 저장)
- [x] **Git 초기화**
    - [x] `git init`
    - [x] `.gitignore` 설정 (`venv`, `node_modules`, `.env`, `__pycache__` 제외)
- [x] **API Key 발급 및 설정**
    - [ ] NewsAPI Key 발급
    - [ ] OpenAI API Key 발급
    - [x] `.env` 파일 템플릿 작성

## 1. 백엔드 개발 (Backend: FastAPI)
> **상태:** 🔄 진행 중

### 1-1. 기본 설정 (Setup)
- [x] Python 가상환경(`venv`) 생성 및 활성화
- [x] 필수 패키지 설치 (`requirements.txt`)
    - `fastapi`, `uvicorn`, `sqlalchemy`, `pydantic`, `python-dotenv`, `httpx`, `openai`
- [x] `backend/app/main.py` 기본 서버 구동 테스트 ("Hello World")

### 1-2. 데이터베이스 및 모델 (DB & Models)
- [x] `backend/app/db/database.py`: SQLite 연결 및 Session 설정
- [x] `backend/app/db/models.py`: SQLAlchemy 모델 정의 (`News` 테이블)
    - 필드: `id`, `title`, `url`, `content`, `summary`, `sentiment_score` 등
- [x] `backend/app/schemas/news.py`: Pydantic 스키마 정의 (Request/Response 검증)

### 1-3. 핵심 로직 구현 (Core Logic)
- [x] **뉴스 수집기 (`services/crawler.py`)**
    - [x] `httpx` 비동기 클라이언트 설정
    - [x] NewsAPI 호출 및 JSON 파싱 함수 구현 (Mock 모드 지원)
- [x] **AI 분석기 (`services/analyzer.py`)**
    - [x] OpenAI API 연동 (ChatCompletion)
    - [x] 프롬프트 엔지니어링 (요약 및 감성 분석 지시) (Mock 모드 지원)

### 1-4. API 엔드포인트 구현 (Endpoints)
- [ ] `POST /api/v1/news/search`: 뉴스 검색 및 DB 저장
- [ ] `GET /api/v1/news`: 저장된 뉴스 목록 조회
- [ ] `POST /api/v1/analysis/{id}`: 특정 뉴스 AI 분석 요청
- [ ] `main.py`: `CORSMiddleware` 설정 (Frontend 연동 준비)

## 2. 프론트엔드 개발 (Frontend: React)
> **상태:** ⬜ 대기 중

### 2-1. 프로젝트 세팅 (Setup)
- [ ] Vite + React + TypeScript 프로젝트 생성
- [ ] Tailwind CSS 설치 및 설정
- [ ] 라이브러리 설치 (`axios`, `react-router-dom`, `@tanstack/react-query`, `lucide-react`)

### 2-2. UI 컴포넌트 개발 (Components)
- [ ] `src/api/axios.ts`: Axios 인스턴스 및 Base URL 설정
- [ ] **Layout**: 헤더(로고), 메인 컨테이너 구조 잡기
- [ ] **SearchBar**: 검색어 입력 폼 및 검색 버튼 UI
- [ ] **NewsCard**:
    - [ ] 기본 상태: 제목, 이미지, 날짜 표시
    - [ ] 분석 완료 상태: 요약문, 감성 라벨(긍정/부정)에 따른 색상 테두리 적용

### 2-3. 기능 연동 (Integration)
- [ ] **검색 기능**: API `/search` 호출 및 React Query로 데이터 캐싱
- [ ] **분석 기능**: "AI 분석" 버튼 클릭 이벤트 핸들링 및 UI 낙관적 업데이트(Optimistic Update)
- [ ] **로딩 및 에러 처리**: 스켈레톤 UI 또는 스피너 적용

## 3. 테스트 및 배포 (Final Polish)
> **상태:** ⬜ 대기 중

- [ ] **E2E 테스트**: 검색 -> 결과 확인 -> AI 분석 -> UI 변경 전체 흐름 확인
- [ ] **예외 처리 점검**: 검색 결과 0건일 때, API 키 오류일 때 안내 문구 확인
- [ ] (Optional) Docker Compose 파일 작성