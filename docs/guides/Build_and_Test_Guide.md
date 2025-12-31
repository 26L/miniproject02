# Build and Test Guide

이 문서는 **News Insight Pro** 프로젝트의 빌드, 테스트 및 배포 준비 과정을 상세히 기술합니다. CI/CD 파이프라인 구성이나 로컬 배포 시 이 가이드를 참조하십시오.

---

## 1. Backend (FastAPI)

백엔드는 Python 기반이므로 컴파일 과정은 없으나, 환경 설정과 테스트 검증이 빌드의 핵심입니다.

### 1.1. 테스트 실행 (Testing)
모든 변경 사항 적용 후에는 반드시 테스트를 수행하여 무결성을 검증해야 합니다.

**명령어 (Windows PowerShell):**
```powershell
cd backend
# 가상환경 활성화
.\venv\Scripts\activate

# 1. 전체 테스트 실행
pytest

# 2. 상세 로그와 함께 실행 (디버깅 시)
pytest -v -s

# 3. E2E 시나리오 테스트만 실행 (검색 -> 분석 흐름)
pytest tests/test_e2e_flow.py
```

**테스트 범위:**
- `test_api.py`: 기본 API 엔드포인트 상태 확인 (Health Check, Mock Search).
- `test_e2e_flow.py`: 실제 유저 시나리오 검증 (뉴스 검색 후 AI 분석 결과가 DB에 반영되는지 확인).

### 1.2. 프로덕션 실행 준비 (Build/Run)
실제 운영 환경에서는 `uvicorn`을 직접 실행하기보다 Docker 등을 활용하는 것이 좋습니다.

**수동 실행 (Production Mode):**
```powershell
# Reload 옵션 제거, Workers 수 지정
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

---

## 2. Frontend (React + Vite)

프론트엔드는 TypeScript 기반이므로 프로덕션 배포를 위해 정적 파일로 **빌드(Build)** 하는 과정이 필요합니다.

### 2.1. 타입 체크 및 린트 (Lint & Type Check)
빌드 전 코드 품질을 확인합니다.

**명령어:**
```powershell
cd frontend

# TypeScript 타입 검사
npm run build # 내부적으로 tsc가 먼저 실행됨

# 린트 검사 (ESLint)
npm run lint
```

### 2.2. 프로덕션 빌드 (Production Build)
최적화된 정적 파일(`html`, `css`, `js`)을 생성합니다.

**명령어:**
```powershell
cd frontend
npm run build
```

**결과물:**
- `frontend/dist/` 폴더에 생성됩니다.
- 이 폴더의 내용을 Nginx, Apache, S3, Vercel 등을 통해 배포하면 됩니다.

### 2.3. 빌드 미리보기 (Preview)
빌드된 결과물이 실제 환경에서 문제없이 작동하는지 로컬에서 확인합니다.

**명령어:**
```powershell
npm run preview
```
- 기본 포트: `http://localhost:4173` (Vite 기본값)

---

## 3. 통합 검증 체크리스트 (Integration Checklist)

배포 전 다음 항목을 반드시 확인하세요.

1.  **환경 변수 (.env) 설정**
    - Backend: `OPENAI_API_KEY`, `NEWS_API_KEY`, `DATABASE_URL`이 프로덕션 값으로 설정되었는가?
    - Frontend: `VITE_API_BASE_URL`이 실제 백엔드 서버 주소를 가리키고 있는가? (예: `https://api.mydomain.com/api/v1`)

2.  **데이터베이스 마이그레이션**
    - 현재는 `main.py` 시작 시 `Base.metadata.create_all`로 자동 생성되지만, 데이터 보존이 중요한 운영 환경에서는 **Alembic** 도입을 권장합니다.

3.  **포트 연결 확인**
    - 프론트엔드와 백엔드 간의 CORS 설정이 올바른지 확인하십시오 (`backend/app/main.py`의 `allow_origins`).

---

## 4. 자동화 (CI/CD Suggestion)

GitHub Actions 등 CI 도구 설정 시 아래 흐름을 권장합니다.

1.  **Backend CI:**
    - Python 3.10+ Setup
    - `pip install -r requirements.txt`
    - `pytest` 실행 (Pass 시 Merge 가능)

2.  **Frontend CI:**
    - Node.js 18+ Setup
    - `npm install`
    - `npm run lint`
    - `npm run build` (Build 성공 시 Merge 가능)
