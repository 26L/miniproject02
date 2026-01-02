# News Insight Pro 📰

AI 기반 글로벌 뉴스 요약 및 감정 분석 서비스입니다. 
복잡한 뉴스 데이터에서 핵심 트렌드와 통찰력을 단 몇 초 만에 발견할 수 있도록 돕습니다.

## ✨ 주요 기능
- **실시간 뉴스 크롤링:** NewsAPI를 연동하여 글로벌 최신 뉴스를 수집합니다.
- **AI 뉴스 요약:** OpenAI GPT-4o-mini를 활용해 긴 기사를 핵심 포인트로 요약합니다.
- **감정 분석:** 뉴스 콘텐츠의 긍정/부정/중립 상태를 판별하여 제공합니다.
- **인사이트 대시보드:** 수집된 뉴스들의 키워드 빈도와 시장 감정 분포를 한눈에 확인합니다.
- **완벽한 한국어 지원:** UI 및 분석 결과가 모두 한국어로 제공됩니다.

## 🛠 기술 스택
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, TanStack Query, Lucide React
- **Backend:** FastAPI (Python), SQLAlchemy, Pydantic, Uvicorn
- **AI/Data:** OpenAI API, NewsAPI, SQLite (aiosqlite)

## 🚀 시작하기

### 환경 변수 설정
`backend/.env` 파일을 생성하고 아래 키를 입력하세요.
```env
OPENAI_API_KEY=your_key_here
NEWS_API_KEY=your_key_here
USE_MOCK_DATA=False
```

### 서버 실행
1. **Backend:**
   ```bash
   cd backend
   python -m venv venv
   .\venv\Scripts\activate
   pip install -r requirements.txt
   python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev -- --host
   ```

## 📈 시스템 구조
- **Main Layout:** 뉴스 피드(좌측)와 실시간 트렌드 분석 패널(우측)의 2단 구성.
- **Data Flow:** NewsAPI -> FastAPI -> OpenAI Analysis -> SQLite DB -> React Frontend.

---
Built with ❤️ by Gemini Agent.