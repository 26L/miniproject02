# Structural Design Specification
뉴스 요약 및 감정 분석 UI

본 문서는 뉴스 요약 및 감정 분석 서비스의 프론트엔드 UI에 대한  
**화면 구조, 영역 책임, 컴포넌트 계층, 데이터 흐름 구조**를 정의한다.

본 문서는 UI Design Guideline과 동등한 상위 기준 문서이며,  
모든 화면 설계 및 기능 확장은 본 구조를 기본으로 한다.

---

## 1. 구조 설계 기본 원칙

### 1.1 단일 책임 원칙 (Single Responsibility)
- 각 UI 영역은 하나의 명확한 역할만 가진다.
- 하나의 영역이 검색·추천·결과를 동시에 담당하지 않는다.

### 1.2 구조 우선 원칙
- 색상, 스타일, 인터랙션보다 구조가 우선한다.
- 구조가 불명확한 UI는 허용하지 않는다.

### 1.3 확장 안정성
- 신규 기능은 기존 구조를 유지한 채 확장 가능해야 한다.
- 임시 구조 또는 화면별 예외 구조는 허용하지 않는다.

---

## 2. 최상위 화면 구조 (Application Level)

### 2.1 논리 구조

Application <br>
 ├─ Header <br>
 ├─ Search Area <br>
 ├─ Content Area <br>
 │ ├─ Recommendation Column <br>
 │ └─ Result Column <br>
 └─ Footer 


### 2.2 영역 책임 요약

| 영역 | 책임 |
|---|---|
| Header | 서비스 식별, 전역 정보 |
| Search Area | 사용자 검색 입력 수집 |
| Content Area | 핵심 정보 노출 |
| Recommendation Column | 탐색 보조 |
| Result Column | 검색 결과 제공 |
| Footer | 부가 정보 |

---

## 3. Header 영역 구조

### 역할
- 서비스 정체성 제공
- 전역 네비게이션 제공(필요 시)

### 구조 규칙
- 검색 입력을 포함하지 않는다.
- 뉴스 콘텐츠를 직접 표시하지 않는다.
- 항상 화면 최상단에 위치한다.

---

## 4. Search Area 구조

### 역할
- 모든 데이터 탐색의 유일한 진입점

### 구조 규칙
- Header 바로 아래에 단독 영역으로 배치한다.
- 가로 전체 폭을 사용한다.
- 검색 입력 외 정보 표시를 금지한다.

### 허용 요소
- 검색 입력 필드
- 검색 실행 트리거(버튼 또는 Enter)

---

## 5. Content Area 구조

### 역할
- 추천 정보와 검색 결과를 동시에 제공하는 핵심 영역

### 구조 규칙
- 중앙 정렬을 기본으로 한다.
- Desktop 기준 2컬럼 구조를 유지한다.
- 컬럼 간 역할 교차를 허용하지 않는다.

---

## 6. Recommendation Column (Left Column)

### 역할
- 사용자의 탐색을 돕는 보조 정보 제공

### 포함 요소
- 오늘의 주요 뉴스 리스트
- 사용자 관심 기반 뉴스 리스트

### 구조 규칙
- 리스트(List) 구조만 허용한다.
- 카드(Card) 구조 사용을 금지한다.
- 뉴스 요약 및 감정 분석 결과 표시를 금지한다.

### 금지 사항
- 결과 콘텐츠 상세 표시
- Result Column을 직접 변경하는 처리

---

## 7. Result Column (Right Column)

### 역할
- 사용자가 소비하는 최종 핵심 정보 제공

### 포함 요소
- 뉴스 검색 결과 카드 목록

### 카드 구조 정의

News Result Card <br>
├─ Title <br>
├─ Summary <br>
├─ Emotion Indicator <br>
└─ Meta Information <br>
├─ Source <br>
└─ Date


### 구조 규칙
- 모든 결과는 카드 단위로 표현한다.
- 추천, 설정, 광고 요소를 포함하지 않는다.

---

## 8. 컴포넌트 계층 구조 원칙

### 8.1 컨테이너 컴포넌트
- 책임: 레이아웃 및 배치
- 특징:
  - 데이터 포맷에 관여하지 않는다.
  - 콘텐츠 표현을 직접 수행하지 않는다.

### 8.2 콘텐츠 컴포넌트
- 책임: 실제 정보 표현
- 특징:
  - 레이아웃 결정 권한이 없다.
  - 컨테이너에 종속된다.

---

## 9. UI 데이터 흐름 구조

### 9.1 검색 기반 흐름

          [User Input (Search)]
                    ↓
         [Search Condition Update]
                    ↓
               [API Request]
                    ↓
          [Result Column Update]


### 9.2 추천 연동 흐름

          [Recommendation Item Click]
                      ↓
            [Search Condition Update]
                      ↓
                 [API Request]
                      ↓
            [Result Column Update]


### 핵심 규칙
- Recommendation Column은 Result Column을 직접 변경하지 않는다.
- 모든 결과 변경은 검색 조건 변경을 통해서만 발생한다.

---

## 10. 반응형 구조 규칙

### Desktop
- Search Area + 2컬럼 구조 유지
- 추천 영역과 결과 영역 동시 노출

### Mobile / Tablet
- 단일 컬럼 구조 전환
- 노출 우선순위
  1. Search Area
  2. Result Column
  3. Recommendation Column(보조 접근)

---

## 11. 구조 변경 허용 기준

구조 변경은 다음 조건을 모두 만족해야 한다.

- 사용자 흐름 개선이 명확한 경우
- 기존 구조로 기능 확장이 불가능한 경우
- 변경 사유가 문서로 기록되는 경우

임시 구조 변경은 허용하지 않는다.

---

## 12. 구조 설계 준수 원칙

- 본 문서는 UI Design Guideline과 동일한 효력을 가진다.
- 신규 화면 및 기능은 본 구조를 기본으로 설계한다.
- 구조 위반은 UI 결함으로 간주한다.

---

End of Structural Design Specification
