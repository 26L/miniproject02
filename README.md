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
- **키워드 검색:** 사용자가 관심 있는 키워드(예: "Tesla", "AI")를 입력하면 관련 최신 뉴스를 실시간으로 크롤링합니다.
- **필터링:** 한국어(Korean) 기사 및 최신순 정렬을 기본으로 하여 노이즈를 제거합니다.
- **중복 방지:** 이미 수집된 기사(URL 기준)는 DB에 중복 저장되지 않도록 처리합니다.

### B. AI 기반 인텔리전스 (AI Intelligence)
- **3줄 요약 (Summarization):** 긴 기사 원문을 GPT 모델이 읽고, 핵심 내용만 추려 3문장 이내로 요약합니다.
- **감성 분석 (Sentiment Analysis):** 기사의 어조를 분석하여 **[긍정 / 중립 / 부정]** 라벨을 부여하고, 감성 강도(0~100점)를 산출합니다.

### C. 직관적 대시보드 (Visual Dashboard)
- **카드 UI:** 뉴스별 요약 정보와 원문 링크를 카드 형태로 제공합니다.
- **색상 코딩 (Color Coding):** 긍정적인 뉴스는 초록색, 부정적인 뉴스는 붉은색 테두리로 시각화하여 직관성을 높입니다.
- **반응형 웹:** PC 및 모바일 환경에 최적화된 UI를 제공합니다.

---

## 3. ⚙️ 핵심 기술 및 로직 (Core Logic)

### 1) 비동기 데이터 파이프라인 (Async Pipeline)
- **구현:** Python `asyncio`와 `httpx`를 사용하여 NewsAPI 크롤링과 OpenAI API 호출을 **비동기(Non-blocking)**로 처리합니다.
- **효과:** 다수의 요청을 동시에 처리하여 대기 시간을 획기적으로 단축하고 사용자 경험을 개선합니다.

### 2) 프롬프트 엔지니어링 (Prompt Engineering)
- **System Prompt:** AI에게 "전문 뉴스 에디터"라는 페르소나를 부여하여, 팩트 중심의 건조하고 명확한 요약체를 생성하도록 제어합니다.
- **Output Schema:** 감성 분석 결과를 정규식 파싱이 필요 없는 **JSON 포맷**으로 강제하여 데이터 처리의 안정성을 확보합니다.

### 3) 상태 관리 및 캐싱 (State Management)
- **React Query:** 프론트엔드에서 서버 데이터를 캐싱하고, 백그라운드에서 동기화하여 불필요한 네트워크 트래픽을 줄입니다.
- **Optimistic UI:** AI 분석 요청 시, 서버 응답이 오기 전에 UI를 미리 갱신하거나 로딩 상태를 정교하게 보여주어 앱이 멈춘 느낌을 주지 않습니다.

---

## 4. 🛠️ 기술 스택 (Tech Stack)

| 분류 | 기술 |
| :--- | :--- |
| **Backend** | Python 3.10+, FastAPI, SQLAlchemy, Pydantic v2 |
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS |
| **Database** | SQLite (Lightweight RDBMS) |
| **AI / API** | OpenAI API (gpt-3.5-turbo), NewsAPI |