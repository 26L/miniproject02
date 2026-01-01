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

## 2. 프론트엔드 개발 (Frontend: React - News Insight Pro 2.0)
> **상태:** 🔄 재개발 진행 중 (Rebuild in Progress)

### 2-1. 프로젝트 초기화 (Initialization)
- [x] **Cleanup**: 기존 프론트엔드 디렉토리 삭제
- [x] **Setup**: Vite + React + TypeScript 프로젝트 재생성
- [x] **Configuration**:
    - Tailwind CSS, PostCSS, Autoprefixer 설정
    - 절대 경로(`@/*`) 설정 (`vite.config.ts`, `tsconfig.json`)
    - 환경 변수 재설정 (`.env.development`)

### 2-2. 핵심 라이브러리 및 구조 (Core & Structure)
- [x] **Libraries**:
    - `axios` (HTTP Client)
    - `@tanstack/react-query` (Server State)
    - `lucide-react` (Icons)
    - `clsx`, `tailwind-merge` (Style Util)
- [x] **Directory Structure**:
    - `src/components/ui` (Atomic Components)
    - `src/features` (Business Logic Components)
    - `src/services` (API Layer)

### 2-3. UI 컴포넌트 개발 (UI Development)
- [x] **Layout System**: Header, Main, Footer (Responsive)
- [x] **Dashboard Features**:
    - [x] `SearchHero`: 중앙 집중형 검색바
    - [x] `NewsGrid`: 뉴스 카드 그리드 뷰
    - [x] `NewsCard`: 개별 뉴스 카드 (감성 배지, 키워드 포함)

### 2-4. 기능 구현 (Feature Implementation)
- [x] **Search**: 검색 API 연동 및 상태 관리
- [x] **Analyze**: 개별 뉴스 AI 분석 요청 및 결과 실시간 반영
- [x] **Interactive Feedback**: 스켈레톤 로딩(기본), 에러 핸들링


## 3. 테스트 및 배포 (Final Polish)
> **상태:** ✅ 완료

- [x] **E2E 테스트**: 검색 -> 결과 확인 -> AI 분석 -> UI 변경 전체 흐름 확인 (Live API 테스트 완료)
- [x] **예외 처리 점검**: 검색 결과 0건일 때, API 키 오류일 때 안내 문구 확인 및 백엔드 503 처리 완료
- [x] **데이터 보존 고도화**: AI 분석 키워드 DB 영구 저장 기능 구현 완료
- [x] **Docker 환경 구축**: `Dockerfile` 및 `docker-compose.yml` 작성 완료

## 4. 향후 로드맵 및 개선 (Future Roadmap & Improvements)

### 4-1. 기술적 고도화 (Technical Refinement) - **Priority**
- [ ] **DB 마이그레이션 도구 도입 (Alembic)**
    - 스키마 변경 이력 관리 및 안전한 마이그레이션 체계 구축
- [ ] **검색 성능 최적화**
    - SQLite FTS(Full-Text Search) 활성화 또는 인덱싱 전략 수립
    - 대량 데이터 조회 시 쿼리 성능 개선
- [ ] **에러 핸들링 강화**
    - 외부 API(NewsAPI, OpenAI) Rate Limit 대응 로직(`tenacity` 등)
    - 백엔드 에러 코드 세분화 및 프론트엔드 사용자 알림 고도화

### 4-2. 기능적 확장 (Functional Expansion) - **On Hold**
- [ ] **사용자 인증 시스템 (User Auth)**: OAuth2 로그인 및 관심 뉴스 저장
- [ ] **데이터 시각화 (Visualization)**: 감성 점수 추이 그래프 등 대시보드
- [ ] **다국어 지원 (Multi-language)**: 실시간 번역 기능
- [ ] **알림 서비스 (Notification)**: 키워드 알림 (Email/Push)

## 5. 유지보수 및 버그 수정 (Maintenance & Bug Fixes)
- [x] **Frontend 설정 오류 수정**: `frontend/.env.development`의 API 주소(`VITE_API_BASE_URL`)를 `localhost:80`에서 `localhost:8000`으로 수정.
- [x] **Backend CORS 설정 확장**: 도커 및 실서버 환경을 위해 `allow_origins`에 `http://localhost`(80포트) 추가.
