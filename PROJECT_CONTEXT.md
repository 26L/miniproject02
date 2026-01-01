### 📂 파일명: `PROJECT_CONTEXT.md`

```markdown
# Project Context: News Insight Pro

## 1. Project Overview
**News Insight Pro**는 실시간 뉴스를 수집하여 AI 기반으로 3줄 요약 및 감성 분석(긍정/부정/중립) 결과를 제공하는 웹 애플리케이션입니다.

- **상태:** ✅ 개발 완료 (Production Ready)
- **최종 업데이트:** 2026-01-02
- **목표:** 사용자가 키워드 검색 시, 수많은 뉴스 중 핵심 내용과 감성 트렌드를 한눈에 파악할 수 있게 함.
- **주요 기능:**
    1. NewsAPI 기반 뉴스 크롤링.
    2. OpenAI API(GPT-3.5) 활용 뉴스 요약 및 감성 분석.
    3. FastAPI 백엔드와 React 프론트엔드 분리 구조.
    4. 분석 결과의 시각화 (감성 점수, 색상 코딩).
    5. **Mock Data Mode:** API Key 없이도 개발 및 테스트가 가능한 모의 데이터 시스템 지원.

---

## 2. Tech Stack

### Backend (Server)
- **Language:** Python 3.10+
- **Framework:** FastAPI
- **Data Handling:** Pydantic v2 (Strict Typing), SQLAlchemy (ORM)
- **Async I/O:** `httpx` (비동기 HTTP 요청 필수), `asyncio`
- **Database:** SQLite (파일 기반, `aiosqlite` 비동기 드라이버 사용)
- **AI/ML:** OpenAI API (gpt-4o-mini)
- **NLP/Text Processing:** Regex, Counter (BoW, Keyword Extraction)
- **Testing:** Pytest, Pytest-Asyncio

### Frontend (Client)
- **Framework:** React 18 (Vite Build Tool)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** TanStack Query (React Query)
- **HTTP Client:** Axios
- **Design System:** See `docs/guides/` (Design Token, UI Guideline, Structural Spec)

### DevOps & Docs
- **CLI Tool:** Gemini CLI
- **Documentation:** Markdown files in `docs/`

---

## 3. Directory Structure (Reference)
*AI는 코드를 생성할 때 이 경로 구조를 엄격히 준수해야 한다.*

```text
Project_Root/
├── .env                    # (Excluded) API Keys
├── .gitignore
├── README.md
├── PROJECT_CONTEXT.md      # This File
│
├── backend/                # FastAPI Application
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py         # App Entrypoint
│   │   ├── core/           # Config & Security
│   │   ├── api/            # Route Handlers
│   │   ├── schemas/        # Pydantic Models (DTO)
│   │   ├── services/       # Business Logic (Crawler, Analyzer)
│   │   ├── utils/          # Utility Functions (Text Processing, NLP)
│   │   └── db/             # Database Models & Connection
│   ├── tests/              # Pytest Test Cases
│   │   └── test_api.py
│   ├── pytest.ini          # Pytest Configuration
│   ├── requirements.txt
│   └── .env
│
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/     # UI Components
│   │   ├── pages/          # Page Components
│   │   ├── hooks/          # Custom Hooks
│   │   ├── api/            # API Integration
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── docs/                   # Documentation & Prompts
    ├── prompts/            # AI Personas & Task prompts
    ├── reports/            # Project reports
    └── guides/             # Manuals & Standards
        ├── API_Key_Setup_Guide.md
        ├── Development_Standard_Guide.md
        ├── Design Token Guideline.md
        ├── Frontend UI Design Guideline.md
        ├── Structural Design Specification.md
        ├── UI Markdown.md
        └── UI Review Checklist.md

```

---

## 4. Coding Conventions & Rules (Strict)

1. **Async/Await:** 백엔드의 모든 I/O 작업(DB 조회, 외부 API 호출)은 반드시 `async def`와 `await`를 사용한다. 동기 함수(`requests` 등) 사용 금지.
2. **Type Hinting:** Python과 TypeScript 모두 엄격한 타입 힌팅을 적용한다. `Any` 타입 사용을 지양한다.
3. **Environment Variables:** API Key, DB URL 등 민감 정보는 절대 코드에 하드코딩하지 않고 `.env` 파일에서 `os.getenv` 혹은 `pydantic_settings`로 로드한다.
4. **Error Handling:** 외부 API 호출 시 `try-except` 블록을 사용하여 예외를 처리하고, 적절한 HTTP 상태 코드를 반환한다.
5. **Clean Code:** 함수는 하나의 책임만 가지도록 작게 분리(SRP 준수)한다.

---

## 5. API Specification (Draft)

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/v1/news/search` | 키워드로 뉴스 검색 및 DB 저장 (크롤링) |
| `GET` | `/api/v1/news` | 저장된 뉴스 목록 조회 |
| `POST` | `/api/v1/analysis/{id}` | 특정 뉴스 ID에 대해 AI 요약 및 감성 분석 수행 |

---

## 6. Required Environment Variables (.env Template)

```bash
# Backend
OPENAI_API_KEY="sk-..."
NEWS_API_KEY="..."
DATABASE_URL="sqlite:///./news_insight.db"

# Frontend
VITE_API_BASE_URL="http://localhost:8000/api/v1"

```

```

---

### 💡 활용 가이드 (Next Step)

이제 파일 생성을 완료하셨다면, 다음과 같이 저에게 명령을 내려보세요.

> "Gemini야, **PROJECT_CONTEXT.md** 파일 내용을 참고해서, **backend/app/main.py** 의 기본 코드를 작성해줘."

이렇게 하시면 제가 프로젝트 구조와 규칙(비동기 사용, 폴더 경로 등)을 이미 알고 있기 때문에, **수정할 필요 없는 완벽한 초안 코드**를 바로 생성해 드립니다.

**보고:** 파일 작성이 완료되면 알려주세요. 바로 **1단계: 백엔드 환경 설정 및 기본 서버 코드** 작성을 시작하겠습니다.

```