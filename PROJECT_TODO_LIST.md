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
> **상태:** ✅ 완료

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
- [x] **NLP 유틸리티 (`utils/text.py`)**
    - [x] 텍스트 전처리 (HTML 제거) 및 BoW 키워드 추출 구현

### 1-4. API 엔드포인트 구현 (Endpoints)
- [x] `POST /api/v1/news/search`: 뉴스 검색 및 DB 저장
- [x] `GET /api/v1/news`: 저장된 뉴스 목록 조회
- [x] `POST /api/v1/analysis/{id}`: 특정 뉴스 AI 분석 요청
- [x] `main.py`: `CORSMiddleware` 설정 (Frontend 연동 준비)
- [x] **테스트 및 검증**: Pytest를 통한 API 동작 확인 완료

## 2. 프론트엔드 개발 (Frontend: React)
> **상태:** ✅ 1단계 완료 (UI/UX 구현)

### 2-1. 프로젝트 세팅 (Setup)
- [x] Vite + React + TypeScript 프로젝트 생성
- [x] Tailwind CSS 설치 및 설정 (`Design Token Guideline` 반영)
- [x] 라이브러리 설치 (`axios`, `@tanstack/react-query`)

### 2-2. UI 컴포넌트 개발 (Components)
- [x] **Layout**: 헤더(로고, 메뉴), 메인 컨테이너, 푸터 구현 (`MainLayout`)
- [x] **SearchArea**: 대형 검색창 및 소개 문구 구현
- [x] **RecommendationColumn**: 추천 뉴스 리스트 구현 (Left Column)
- [x] **ResultColumn**: 뉴스 카드 및 감성 뱃지 구현 (Right Column)
- [x] **Localization**: 한국어 우선 정책 적용 및 정중한 어조(해요체) 반영

### 2-3. 기능 연동 (Integration)
> **상태:** ⬜ 대기 중 (Next Step)
- [ ] `src/api/axios.ts`: Axios 인스턴스 및 Base URL 설정
- [ ] **검색 기능**: API `/search` 호출 및 React Query로 데이터 캐싱
- [ ] **분석 기능**: "AI 분석" 버튼 클릭 이벤트 핸들링 및 UI 낙관적 업데이트(Optimistic Update)
- [ ] **로딩 및 에러 처리**: 스켈레톤 UI 또는 스피너 적용

## 3. 테스트 및 배포 (Final Polish)
> **상태:** ⬜ 대기 중

- [ ] **E2E 테스트**: 검색 -> 결과 확인 -> AI 분석 -> UI 변경 전체 흐름 확인
- [ ] **예외 처리 점검**: 검색 결과 0건일 때, API 키 오류일 때 안내 문구 확인
- [ ] (Optional) Docker Compose 파일 작성