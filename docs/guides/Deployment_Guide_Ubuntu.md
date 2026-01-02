# Ubuntu Build & Deployment Guide (Linux)

이 문서는 우분투(Ubuntu) 환경에서 **News Insight Pro**를 처음부터 설치, 빌드 및 실행하는 방법을 설명합니다. 듀얼 부팅 등을 통해 리눅스 환경을 처음 접하는 사용자를 위해 단계별로 구성되었습니다.

---

## 1. 필수 요소 (Required Components)

시스템 가동을 위해 반드시 설치되어야 하는 요소들입니다.

- **OS:** Ubuntu 22.04 LTS 이상 권장
- **Python:** 3.10 이상 (표준 라이브러리 포함)
- **Node.js:** v18 이상 (LTS 버전 권장)
- **Git:** 소스 코드 관리 및 클론용

---

## 2. 설치 및 환경 구축 (Step-by-Step)

### 2.1. 시스템 업데이트 및 기본 도구
터미널(`Ctrl+Alt+T`)을 열고 아래 명령어를 입력하여 시스템을 최신화합니다.
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y build-essential curl git
```

### 2.2. Python 환경 설정
우분투에는 기본적으로 Python이 설치되어 있으나, 가상환경 도구가 필요합니다.
```bash
sudo apt install -y python3 python3-pip python3-venv
```

### 2.3. Node.js 및 npm 설치
Vite 프론트엔드 빌드를 위해 필요합니다. NVM(Node Version Manager) 사용을 권장합니다.
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
```

---

## 3. 프로젝트 빌드 및 설정

### 3.1. 저장소 클론
```bash
git clone https://github.com/26L/miniproject02.git
cd miniproject02
```

### 3.2. 백엔드 설치
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 3.3. 프론트엔드 설치
```bash
cd ../frontend
npm install
```

---

## 4. 환경 변수 설정 (.env)

각 폴더에 환경 변수 파일을 생성해야 정상 작동합니다.

**backend/.env**
```env
OPENAI_API_KEY="본인의_오픈AI_키"
NEWS_API_KEY="본인의_뉴스API_키"
USE_MOCK_DATA=False
DATABASE_URL="sqlite+aiosqlite:///./news_insight.db"
```

---

## 5. 실행 및 확인

### 5.1. 서버 실행
- **백엔드:** `uvicorn app.main:app --host 0.0.0.0 --port 8000`
- **프론트엔드:** `npm run dev -- --host`

### 5.2. 접속 주소
- 프론트엔드: `http://localhost:5173` 또는 `http://127.0.0.1:5173`

---

## 6. 선택 요소 (Optional)

- **Docker:** `sudo apt install docker.io docker-compose` 설치 후 `docker-compose up --build`로 한 번에 실행 가능합니다.
- **Nginx:** 운영 환경에서 80 포트(HTTP)로 서비스하고 싶을 때 사용합니다.

---

## 7. 주의사항 (Precautions) - 필수 확인!

1. **파일 경로 대소문자:** 윈도우와 달리 리눅스는 `News.py`와 `news.py`를 다르게 인식합니다. 임포트 오류 발생 시 파일명을 확인하세요.
2. **방화벽(UFW):** 접속이 안 된다면 `sudo ufw allow 8000/tcp` 명령어로 포트를 열어주어야 합니다.
3. **가상환경 활성화:** 백엔드 작업 시 항상 `source venv/bin/activate`를 통해 가상환경을 먼저 켜야 합니다.
4. **관리자 권한:** `npm install` 시 `sudo`를 사용하는 것은 보안상 권장되지 않으므로 NVM을 사용해 사용자 권한으로 설치하세요.

---
최종 수정일: 2026-01-02
