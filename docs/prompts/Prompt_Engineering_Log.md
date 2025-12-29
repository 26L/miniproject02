# 🧠 Prompt Engineering Log

이 문서는 개발 과정에서 AI(LLM)에게 제공된 주요 프롬프트와 그 의도, 그리고 개선된 프롬프트 전략을 기록합니다.

---

## 1. 2025-12-29 (Mon)

### 📌 Session 1: Project Initialization
*   **Prompt:** "PROJECT_CONTEXT.md 파일 내용을 참고해서, backend/app/main.py 의 기본 코드를 작성해줘."
*   **Intent:** 프로젝트의 기반이 되는 규칙(비동기, 폴더 구조 등)을 AI가 인식하고 실수 없이 초기 코드를 작성하도록 유도.
*   **Outcome:** `Settings`, `AsyncSQLAlchemy`, `FastAPI` 기본 설정이 포함된 결점 없는 초안 생성됨.

### 📌 Session 2: Core Logic Implementation (Mock Data)
*   **Prompt:** "뉴스 수집기와 AI 분석기 서비스를 구현해줘. 단, API 키가 없을 때를 대비해 Mock 모드를 지원해야 해."
*   **Intent:** 개발 초기 단계에서 외부 API 의존성을 줄이고, 프론트엔드 개발을 병행하기 위해 가짜 데이터를 반환하는 로직 요청.
*   **Outcome:** `USE_MOCK_DATA` 플래그를 도입하여 실제 API 호출 없이도 개발 가능한 환경 구축.

### 📌 Session 3: NLP Enhancement (Vectorization & Preprocessing)
*   **Prompt:** (User Provided Context about BoW, TF-IDF, Preprocessing) -> "핵심 기술의 설명인데 추가적으로 적용시킬 수 있는 부분을 찾아서 적용시켜줄래?"
*   **Intent:** 사용자가 제공한 NLP 이론(텍스트 벡터화, 전처리)을 실제 서비스 코드에 녹여내어 품질 향상 및 비용 절감.
*   **Outcome:**
    *   `TextProcessor` 유틸리티 클래스 생성.
    *   **Preprocessing:** 정규표현식을 이용한 HTML 태그 및 노이즈 제거 (Token 절약).
    *   **Keyword Extraction:** BoW(빈도수) 기반의 Top 5 키워드 추출 기능 추가 (AI 의존도 감소).

---

## 2. Key Learnings & Improvements

1.  **Context-Aware Code Generation:** 단순히 "코드 짜줘"가 아니라, `PROJECT_CONTEXT.md`를 먼저 읽히고 "이 규칙을 따라서 짜줘"라고 했을 때 퀄리티가 훨씬 높음.
2.  **Mock First Strategy:** 외부 API 연동 전 Mock 데이터를 먼저 구축함으로써, API 키 발급 지연이나 비용 문제 없이 로직 검증이 가능해짐.
3.  **Hybrid AI approach:** 모든 것을 GPT에게 맡기기보다, 간단한 전처리나 키워드 추출은 로컬 알고리즘(Regex, Counter)으로 해결하여 효율성을 극대화함.
