# 📰 News Insight Pro

**News Insight Pro**는 실시간 뉴스를 수집하여 OpenAI(GPT) 기반의 **3줄 요약**과 **감성 분석(Sentiment Analysis)**을 제공하는 지능형 뉴스 대시보드입니다.

단순한 뉴스 나열을 넘어, 사용자가 뉴스의 핵심 내용과 긍정/부정의 뉘앙스를 한눈에 파악하여 신속한 의사결정을 내릴 수 있도록 돕습니다.

---

## 1. 🚩 개발 개요 (Overview)

- **프로젝트명:** News Insight Pro
- **개발 목표:** 방대한 뉴스 데이터 속에서 '핵심'과 '여론'을 시각적으로 필터링해주는 웹 서비스 구축.
- **아키텍처:** RESTful API 기반의 **Client-Server (FastAPI + React)** 구조.
- **주요 기술:** Python(FastAPI), TypeScript(React), OpenAI API, NewsAPI.

---

## 2. 🌟 주요 기능 (Key Features)

### A. 뉴스 검색 및 수집 (News Aggregation)
- **키워드 검색:** 사용자가 관심 있는 키워드를 입력하면 관련 최신 뉴스를 실시간으로 크롤링합니다.
- **데이터 정제:** 정규표현식을 사용하여 HTML 태그 및 노이즈를 제거하여 깨끗한 텍스트만 저장합니다.
- **중복 방지:** 이미 수집된 기사는 중복 저장되지 않도록 처리합니다.

### B. AI 기반 인텔리전스 (AI Intelligence)
- **3줄 요약 (Summarization):** 긴 기사 원문을 GPT 모델이 읽고 핵심 내용만 요약합니다.
- **감성 분석 (Sentiment Analysis):** 기사의 어조를 분석하여 **[긍정 / 중립 / 부정]** 라벨을 부여합니다.
- **키워드 추출 (Keyword Extraction):** BoW(Bag of Words) 알고리즘을 활용하여 본문에서 빈도수가 높은 핵심 키워드를 자동으로 추출합니다.

### C. 직관적 대시보드 (Visual Dashboard)
- **카드 UI:** 뉴스별 요약 정보와 원문 링크를 카드 형태로 제공합니다.
- **색상 코딩:** 긍정/부정에 따른 테두리 색상 변화로 직관성을 높입니다.

---

## 3. ⚙️ 핵심 기술 및 로직 (Core Logic)

### 1) 비동기 데이터 파이프라인 (Async Pipeline)
- Python `asyncio`와 `httpx`를 사용하여 외부 API 호출 및 DB 작업을 비동기로 처리하여 성능을 극대화했습니다.

### 2) 하이브리드 개발 환경 (Mock System)
- API 키 없이도 개발 및 테스트가 가능하도록 가짜 데이터(Mock) 생성 시스템을 탑재했습니다. (`USE_MOCK_DATA=True`)

### 3) 로컬 NLP 분석 (Text Processing)
- AI 호출 비용을 절감하기 위해 간단한 전처리 및 키워드 추출은 로컬 서버 엔진(Python)에서 직접 수행합니다.

---

## 4. 🚀 시작하기 (Getting Started)

### 백엔드 실행 (Backend)
```bash
cd backend
# 가상환경 활성화 (Windows)
.\venv\Scripts\activate
# 의존성 설치
pip install -r requirements.txt
# 서버 실행
python -m uvicorn app.main:app --reload
```

### 테스트 실행 (Testing)
```bash
cd backend
$env:PYTHONPATH="."
python -m pytest tests/
```

---

## 5. 🛠️ 기술 스택 (Tech Stack)

| 분류 | 기술 |
| :--- | :--- |
| **Backend** | Python 3.10+, FastAPI, SQLAlchemy (Async), Pydantic v2 |
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS |
| **Database** | SQLite (`aiosqlite` 비동기 드라이버) |
| **Testing** | Pytest, Pytest-Asyncio |
| **AI / API** | OpenAI API, NewsAPI |
