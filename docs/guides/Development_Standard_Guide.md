# 📝 개발 표준 및 주석 가이드라인 (Development Standards & Commenting Guide)

본 문서는 **News Insight Pro** 프로젝트의 일관된 코드 품질 유지와 협업 효율성을 위해 준수해야 할 개발 규칙 및 주석 작성법을 정의합니다. 모든 개발자는 이 가이드를 준수해야 합니다.

---

## 1. 공통 원칙 (General Principles)

1.  **Strict Typing (엄격한 타입 사용):**
    *   **Python:** `Any` 타입 사용을 극도로 지양합니다. `typing` 모듈과 Pydantic 모델을 적극 활용합니다.
    *   **TypeScript:** `any` 사용을 금지합니다. 인터페이스(Interface)와 타입(Type)을 명확히 정의합니다.
2.  **단일 책임 원칙 (SRP):**
    *   하나의 함수나 컴포넌트는 **하나의 기능**만 수행해야 합니다.
    *   함수의 길이가 너무 길어지면(약 20~30줄 이상), 하위 함수로 분리하는 것을 고려합니다.
3.  **환경 변수:**
    *   API Key, DB URL 등 민감 정보는 절대 코드에 하드코딩하지 않습니다. 반드시 `.env` 파일을 통해 로드합니다.

---

## 2. 백엔드 가이드 (Python / FastAPI)

### 2.1. 코딩 컨벤션
*   **비동기 필수 (Async/Await):** I/O 작업(DB 조회, HTTP 요청)이 포함된 모든 함수는 `async def`로 선언하고 `await`를 사용합니다.
*   **네이밍:**
    *   변수/함수명: `snake_case` (예: `get_news_list`)
    *   클래스명: `PascalCase` (예: `NewsAnalyzer`)
    *   상수: `UPPER_SNAKE_CASE` (예: `MAX_RETRY_COUNT`)

### 2.2. 주석 및 Docstring 작성법
Python 코드는 **Google Style Docstring**을 따릅니다.

*   **함수/메서드:** 주요 로직을 수행하는 함수에는 반드시 Docstring을 작성합니다.
*   **인라인 주석:** 코드의 '동작(What)'이 아닌 **'이유(Why)'**를 설명합니다.

**✅ 좋은 예시:**
```python
async def analyze_sentiment(text: str) -> SentimentResult:
    """
    주어진 텍스트의 감성을 분석하여 긍정/부정 점수를 반환합니다.
    
    Args:
        text (str): 분석할 뉴스 본문 텍스트.
        
    Returns:
        SentimentResult: 감성 점수와 라벨(긍정/부정/중립)을 포함한 객체.
        
    Raises:
        OpenAIError: API 호출 실패 시 발생.
    """
    # API 비용 절감을 위해 텍스트 길이가 10자 미만이면 분석하지 않음 (Why)
    if len(text) < 10:
        return SentimentResult(score=0.0, label="neutral")
        
    # ... 비즈니스 로직 ...
```

### 2.3. 에러 핸들링 (Error Handling)
*   **Try-Except 사용:** 외부 API 호출 등 실패 가능성이 있는 로직은 반드시 `try-except`로 감싸야 합니다.
*   **HTTP 예외 반환:** FastAPI의 `HTTPException`을 사용하여 명확한 상태 코드와 메시지를 클라이언트에 전달합니다.
*   **재시도 로직 (Future Standard):** API Rate Limit 이슈 대응을 위해 `tenacity` 등의 라이브러리를 활용한 재시도 로직 구현을 권장합니다.

---

## 3. 프론트엔드 가이드 (React / TypeScript)

### 3.1. 코딩 컨벤션
*   **컴포넌트:** 함수형 컴포넌트(Functional Component)만 사용합니다.
*   **네이밍:**
    *   컴포넌트/파일: `PascalCase` (예: `NewsCard.tsx`)
    *   함수/변수: `camelCase` (예: `fetchNews`)
*   **상태 관리:** 서버 상태는 `TanStack Query`를 사용하고, 로컬 UI 상태는 `useState`, `useReducer`를 사용합니다.

### 3.2. 주석 및 JSDoc 작성법
*   **복잡한 로직:** 복잡한 유틸리티 함수나 Hook에는 JSDoc을 작성합니다.
*   **Props:** 인터페이스에 주석을 달아 Prop의 용도를 설명합니다.

**✅ 좋은 예시:**
```typescript
interface NewsCardProps {
  /** 뉴스 기사 고유 ID */
  id: number;
  /** 화면에 표시할 제목 (30자 이상 말줄임 처리됨) */
  title: string;
  /** 요약된 본문 내용 */
  summary: string;
}

/**
 * 뉴스 아이템 하나를 카드 형태로 보여주는 컴포넌트
 */
export const NewsCard = ({ id, title, summary }: NewsCardProps) => {
    // ... 구현 ...
}
```

---

## 4. 주석 작성 핵심 철학 (The "Why", not "What")

주석은 코드를 읽는 사람(미래의 나, 혹은 동료)을 위한 배려입니다.

*   **❌ 나쁜 예 (What):** 코드를 그대로 번역한 주석
    ```python
    i = i + 1  # i를 1 증가시킴
    ```
*   **✅ 좋은 예 (Why):** 왜 이렇게 작성했는지 설명
    ```python
    # 다음 페이지네이션 오프셋 계산을 위해 인덱스 증가
    i = i + 1 
    ```

### 4.1. TODO 주석
나중에 처리해야 하거나 개선이 필요한 부분은 반드시 `TODO` 키워드를 사용합니다.
```python
# TODO: 추후 Redis 캐싱을 도입하여 조회 성능 최적화 필요
```

---

이 문서는 프로젝트 진행 상황에 따라 지속적으로 업데이트됩니다.