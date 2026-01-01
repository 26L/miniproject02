# 테스트 환경 실행 가이드 (Execution Guide)

이 문서는 **News Insight Pro** 프로젝트를 로컬 환경에서 실행하고 테스트하는 방법을 설명합니다.

---

## 1. 사전 준비 (Prerequisites)

실행 전 아래 항목이 설치되어 있어야 합니다.
- **Python:** 3.10 이상
- **Node.js:** 18.x 이상 (npm 포함)
- **API Keys:** `.env` 파일에 `NEWS_API_KEY`와 `OPENAI_API_KEY`가 설정되어 있어야 합니다. (설정 방법은 `API_Key_Setup_Guide.md` 참고)

---

## 2. 백엔드 실행 (Backend: FastAPI)

1. **디렉터리 이동:**
   ```powershell
   cd backend
   ```

2. **가상환경 활성화:**
   - **Windows:** `.\venv\Scripts\activate`
   - **Mac/Linux:** `source venv/bin/activate`

3. **의존성 설치 (최초 1회 또는 업데이트 시):**
   ```powershell
   pip install -r requirements.txt
   ```

4. **서버 실행:**
   ```powershell
   uvicorn app.main:app --reload --port 8000
   ```
   - 서버가 실행되면 [http://localhost:8000/docs](http://localhost:8000/docs)에서 API 문서를 확인할 수 있습니다.

---

## 3. 프론트엔드 실행 (Frontend: React)

1. **디렉터리 이동 (새 터미널 권장):**
   ```powershell
   cd frontend
   ```

2. **패키지 설치 (최초 1회 또는 업데이트 시):**
   ```powershell
   npm install
   ```

3. **개발 서버 실행:**
   ```powershell
   npm run dev
   ```
   - 기본적으로 [http://localhost:5173](http://localhost:5173)에서 실행됩니다.

---

## 4. 통합 테스트 시나리오

앱이 정상적으로 연동되었는지 확인하려면 다음 순서를 따르세요.

1. **접속:** 브라우저에서 `http://localhost:5173`을 엽니다.
2. **뉴스 검색:** 검색창에 "인공지능" 또는 "삼성전자"와 같은 키워드를 입력하고 검색 버튼을 누릅니다.
3. **결과 확인:** 우측 '최신 분석 결과' 영역에 뉴스 카드가 로드되는지 확인합니다.
4. **AI 분석:** 뉴스 카드 하단의 **[AI 분석 실행 →]** 버튼을 클릭합니다.
5. **업데이트 확인:** 약 2~5초 후, 요약 텍스트가 나타나고 감성 배지(긍정/중립/부정)가 업데이트되는지 확인합니다.

---

## 5. 문제 해결 (Troubleshooting)

- **CORS 에러 발생 시:** `backend/app/main.py`의 `CORSMiddleware` 설정에 `http://localhost:5173`이 포함되어 있는지 확인하세요.
- **API 연결 실패:** `frontend/.env.development` 파일의 `VITE_API_BASE_URL`이 `http://localhost:8000/api/v1`으로 올바르게 설정되어 있는지 확인하세요.
- **API 응답 없음:** `.env` 파일의 API 키가 유효한지, 그리고 백엔드 터미널에 에러 로그가 찍히지 않는지 확인하세요.
- **포트 충돌:** 이미 8000번이나 5173번 포트가 사용 중이라면 다른 포트로 실행하세요. (예: `uvicorn ... --port 8080`)
