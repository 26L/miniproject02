# Frontend UI Guideline – Document Bundle
뉴스 요약 및 감정 분석 UI

본 문서는 본 프로젝트에서 사용되는 **모든 UI 관련 기준 문서의 목록, 역할, 의존 관계**를 정의한다.  
각 문서는 독립적이지만, 명확한 우선순위와 참조 관계를 가진다.

---

## 1. 문서 체계 개요

본 UI 가이드 체계는 다음 4개의 핵심 문서로 구성된다.

1. UI Design Guideline (정책)
2. Design Token Guideline (값)
3. Structural Design Specification (구조)
4. Interest-based UI Review Checklist (검증)

이 네 문서는 **서로 대체 불가**하며, 각각의 책임 영역이 명확히 분리되어 있다.

---

## 2. 문서별 역할 정의

### 2.1 UI Design Guideline

**문서 성격**
- 정책 문서 (Policy)

**결정하는 것**
- 무엇을 보여야 하는가
- 기능별 UI 배치 원칙
- 색상·타이포·인터랙션의 “역할”

**결정하지 않는 것**
- 색상 값(hex)
- px, rem 등 수치

**참조 관계**
- Design Token Guideline을 참조한다.
- Structural Design Specification과 동등한 상위 기준이다.

---

### 2.2 Design Token Guideline

**문서 성격**
- 기준 값 문서 (Single Source of Truth)

**결정하는 것**
- 색상 값
- 폰트, 크기, 굵기
- 라운드, 그림자, 전환 시간

**결정하지 않는 것**
- UI 구조
- 레이아웃 배치

**참조 관계**
- UI Design Guideline에서 역할 단위로 참조된다.
- 코드 및 디자인 시안은 반드시 이 문서를 참조해야 한다.

---

### 2.3 Structural Design Specification

**문서 성격**
- 구조 설계 문서 (Architecture)

**결정하는 것**
- 화면 분할 구조
- 영역 책임
- 컴포넌트 계층 관계
- 데이터 흐름의 UI 관점 구조

**결정하지 않는 것**
- 색상 값
- 세부 스타일

**참조 관계**
- UI Design Guideline과 동등한 상위 기준
- 모든 화면 설계는 본 구조를 기본으로 한다.

---

### 2.4 Interest-based UI Review Checklist

**문서 성격**
- 검증 및 의사결정 문서 (Review)

**결정하는 것**
- 구현물이 “관심을 유발하는 UI인가”
- 배포 가능 여부 판단

**결정하지 않는 것**
- 새로운 정책
- 구조 변경

**참조 관계**
- UI Design Guideline
- Design Token Guideline
- Structural Design Specification  
위 세 문서를 모두 참조하여 검증한다.

---

## 3. 문서 간 의존 관계 (Hierarchy)

             [UI Design Guideline]
                       ▲
                       │
      [Structural Design Specification]
                       ▲
                       │
           [Design Token Guideline]
                       ▲
                       │
      [Interest-based UI Review Checklist]


### 해석
- **정책(UI Design / Structural)** 이 최상위
- **값(Design Token)** 은 정책을 지원
- **리뷰 문서**는 위 모든 문서를 기준으로 판단

---

## 4. 변경 관리 원칙

### 4.1 변경 허용 범위

| 문서 | 변경 빈도 | 영향 범위 |
|---|---|---|
| UI Design Guideline | 매우 낮음 | 전체 UI |
| Structural Design Spec | 낮음 | 화면 구조 |
| Design Token Guideline | 중간 | 시각적 스타일 |
| Review Checklist | 중간 | QA / 배포 판단 |

---

### 4.2 변경 절차

1. 변경 사유 명시
2. 영향 문서 확인
3. 관련 문서 동시 업데이트 여부 판단
4. 변경 이력 기록

---

## 5. 실무 적용 기준

### 신규 화면/기능 추가 시
1. Structural Design Specification에 구조 적합 여부 확인
2. UI Design Guideline에 정책 위반 여부 확인
3. Design Token Guideline 기준 값 사용
4. Review Checklist로 최종 검증

---

### 리뷰/QA 시
- Review Checklist만 사용해 판단
- 개인 취향/주관적 코멘트 배제

---

## 6. 문서 우선순위 충돌 시 기준

1. Structural Design Specification
2. UI Design Guideline
3. Design Token Guideline
4. Review Checklist

> 하위 문서는 상위 문서를 재정의할 수 없다.

---

## 7. 문서 운영 원칙

- 본 문서 묶음은 프로젝트의 **공식 UI 기준**이다.
- 예외는 허용하되, 반드시 문서로 남긴다.
- 구두 합의는 인정하지 않는다.

---

End of Document Bundle
