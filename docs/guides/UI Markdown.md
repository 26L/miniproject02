# UI 마크다운 - 2025년 12월 31일 08시 30분

## 최종 선택된 UI 디자인 시스템

--- 

### 1. 포트폴리오 레이아웃 (Layout Structure)

**레이아웃 구조**
- **마소니 그리드**: 다양한 높이의 카드를 자연스럽게 배치
- **프로젝트 카드**: 호버 시 오버레이 효과 제공
- **필터**: 카테고리별 정렬 기능
- **라이트박스**: 이미지/상세 확대 보기
- **애니메이션**: 스크롤 위치에 따른 등장 효과

---

### 2. Ocean Blue 컬러 시스템 (Color Palette)

**컬러 팔레트**
- **Primary**: `#0ea5e9` (하늘색 - 주요 액션)
- **Secondary**: `#0284c7` (진한 파랑 - 강조)
- **Accent**: `#38bdf8` (밝은 파랑 - 하이라이트)
- **Success**: `#10b981` (긍정/성공)
- **Warning**: `#f59e0b` (중립/주의)
- **Error**: `#ef4444` (부정/오류)
- **Base Colors**: 
  - Background: `#f8fafc` (Gray-50)
  - Text: `#0f172a` (Gray-900)

---

### 3. Smooth Slide 인터랙션 (Animations)

**애니메이션 효과**
- **트랜지션**: `transform: translateX()` 기반의 부드러운 이동
- **지속시간**: `0.3s ease-in-out`
- **적용 요소**: 메뉴, 카드, 모달 창
- **성능**: GPU 가속 활용하여 버벅임 방지
- **접근성**: `prefers-reduced-motion` 미디어 쿼리 고려

---

### 4. Modern Typography (Font System)

**타이포그래피**
- **영문**: Poppins (300-700)
- **한글**: **Noto Sans KR** (300-700) - *가독성 및 웹 폰트 접근성 최적화*
- **폴백(Fallback)**: system-ui, sans-serif
- **크기**: 기본 16px (1rem), 1.25 배율 시스템
- **행간**: 1.5 (본문) ~ 1.6
- **특징**: 뉴스 가독성을 최우선으로 한 깔끔한 스타일

---

### 5. CSS Grid Modern 그리드 (Grid System)

**그리드 구조**
- **컬럼**: `auto-fit`, `minmax(250px, 1fr)` 유동적 배치
- **간격**: 32px (2rem)
- **브레이크포인트**: 디바이스 폭에 따른 유연한 반응형
- **컨테이너**: 100% width (Max-width 제한)

---

### 6. Rounded Soft 컴포넌트 (Component Style)

**컴포넌트 디자인**
- **모서리**: `border-radius: 12px` (부드러운 사각형)
- **그림자**: `box-shadow: 0 4px 6px rgba(0,0,0,0.1)` (Soft Shadow)
- **호버 효과**: `transform: scale(1.02)` (살짝 커짐)
- **트랜지션**: `all 0.2s ease`

---

### 7. Standard 성능 최적화 (Performance)

**최적화 전략**
- **이미지**: WebP 차세대 포맷 사용
- **폰트**: Google Fonts (Subset) 최적화 로드
- **리소스**: CSS/JS 압축 및 최소화
- **캐싱**: 브라우저 캐싱 정책 적극 활용

---

### 8. Desktop First 반응형 (Responsive)

**반응형 접근법**
- **우선순위**: 데스크톱 화면 우선 설계 (정보량 중심)
- **레이아웃**: 2컬럼(Desktop) → 1컬럼(Mobile)
- **네비게이션**: 전체 메뉴(Desktop) → 햄버거 메뉴(Mobile)
- **특징**: 화면 크기가 줄어들면 보조 정보(추천 등)는 하단 배치

---

### 9. SEO & Accessibility (Web Standard)

**웹 표준 전략**
- **메타태그**: Open Graph, Twitter Cards 적용
- **구조화**: Semantic Tags (header, main, footer) 및 Schema.org
- **접근성**: WCAG 2.1 AA 기준 준수 (명도 대비, 대체 텍스트)

---

### 10. Language Guideline (Language)

**언어 사용 규칙**
- **기본 언어**: 한국어 (Korean) - 모든 UI 텍스트의 기본
- **보조 언어**: 영어 (English) - 기술 용어 및 공간 제약 시 허용
- **톤앤매너**: 정중하고 명확한 어조 (Professional & Polite)
