# Design Token Guideline
뉴스 요약 및 감정 분석 UI

문서 목적:  
본 문서는 **UI 구현에 사용되는 모든 시각적 값(Value)**을 단일 기준으로 정의한다.  
색상, 타이포, 간격, 라운드 등 **수치가 필요한 모든 요소의 유일한 출처(Single Source of Truth)** 역할을 한다.

---

## 1. 문서 역할 정의

### 1.1 UI Design Guideline와의 관계

| 구분 | UI Design Guideline | Design Token Guideline |
|---|---|---|
| 목적 | 무엇을 어떻게 보여줄지 | 어떤 값을 사용할지 |
| 내용 | 구조, 역할, 규칙 | 색상값, 폰트값, 수치 |
| 변경 빈도 | 낮음 | 상대적으로 높음 |
| 대상 | 기획/디자인/개발 공통 | 개발 중심 |

> UI 가이드라인은 **정책 문서**,  
> Design Token은 **기준 값 문서**다.

---

## 2. 토큰 관리 원칙

### 2.1 단일 기준 원칙

- 모든 색상, 폰트, 라운드 값은 **이 문서에서만 정의**한다.
- UI 가이드라인, 코드, 디자인 시안은 **이 문서를 참조만** 한다.
- 중복 정의를 허용하지 않는다.

---

### 2.2 네이밍 원칙

- 토큰 이름은 **역할(Role) 기반**으로 정의한다.
- 색상 이름에 의미(blue, red 등)를 직접 사용하지 않는다.

예:
- ❌ `blue-500`
- ❌ `sky-main`
- ✅ `color-primary`
- ✅ `color-success`

---

## 3. Color Tokens

### 3.1 기본 컬러 토큰

| Token Name | Value | Description |
|---|---|---|
| color-primary | #0ea5e9 | 주요 액션, 핵심 강조 |
| color-secondary | #0284c7 | 보조 강조, 활성 상태 |
| color-accent | #38bdf8 | 부분 하이라이트 |
| color-surface | #f8fafc | 기본 배경 |
| color-text | #0f172a | 기본 텍스트 |

---

### 3.2 상태 컬러 토큰

| Token Name | Value | Usage |
|---|---|---|
| color-success | #10b981 | 긍정, 성공 |
| color-warning | #f59e0b | 중립, 주의 |
| color-error | #ef4444 | 부정, 오류 |

---

## 4. Typography Tokens

### 4.1 Font Family

| Token Name | Value |
|---|---|
| font-base | Poppins, Noto Sans KR, sans-serif |

---

### 4.2 Font Size

| Token Name | Value | Usage |
|---|---|---|
| font-size-title | 1.125rem | 카드/섹션 제목 |
| font-size-body | 1rem | 기본 본문 |
| font-size-meta | 0.875rem | 출처, 날짜 |

---

### 4.3 Font Weight

| Token Name | Value |
|---|---|
| font-weight-regular | 400 |
| font-weight-medium | 500 |
| font-weight-semibold | 600 |
| font-weight-bold | 700 |

---

## 5. Shape & Effect Tokens

### 5.1 Radius

| Token Name | Value | Usage |
|---|---|---|
| radius-ui | 12px | 카드, 버튼, 입력창 |

---

### 5.2 Shadow

| Token Name | Value | Usage |
|---|---|---|
| shadow-card | 0 4px 6px rgba(0,0,0,0.1) | 카드 기본 |

---

## 6. Interaction Tokens

### 6.1 Transition

| Token Name | Value | Usage |
|---|---|---|
| transition-default | all 0.2s ease | 기본 hover |
| transition-smooth | all 0.3s ease-in-out | 화면 전환 |

---

## 7. 문서 간 참조 규칙

### 7.1 UI Design Guideline에서의 참조 방식

- UI 가이드라인에서는:
  - “Primary 컬러 사용”까지만 명시
  - **값(hex, px)은 명시하지 않는다**

예:
- ❌ “Primary는 #0ea5e9를 사용한다”
- ✅ “Primary 컬러를 사용한다 (값은 Design Token 참조)”

---

### 7.2 변경 시 영향 범위

- 토큰 변경 → 전체 UI 반영
- UI 가이드라인 변경 → 구조/정책 영향
- 토큰과 가이드라인은 **서로 직접 수정하지 않는다**

---

## 8. 버전 관리 원칙

- Design Token 문서는 버전 관리 대상이다.
- 토큰 변경 시 반드시 변경 이력을 기록한다.

예:
- v1.0.1: Primary 컬러 명도 조정
- v1.1.0: Dark Mode 토큰 추가

---

## 9. 준수 원칙

- 코드 및 디자인 시안에서 **임의 값 사용 금지**
- 신규 토큰 추가 시 반드시 본 문서에 정의
- 임시 값 사용은 허용하지 않는다

---

End of Document
