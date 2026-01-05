# News Insight Pro 📰

AI 기반 글로벌 뉴스 요약 및 감정 분석 서비스입니다. 
복잡한 뉴스 데이터에서 핵심 트렌드와 통찰력을 단 몇 초 만에 발견할 수 있도록 돕습니다.

## ✨ 주요 기능

- **실시간 뉴스 크롤링:** NewsAPI를 연동하여 글로벌 최신 뉴스를 수집합니다.
- **AI 뉴스 요약:** OpenAI GPT-4o-mini를 활용해 긴 기사를 핵심 포인트로 요약합니다.
- **감정 분석:** 뉴스 콘텐츠의 긍정/부정/중립 상태를 판별하여 제공합니다.
- **인사이트 대시보드:** 수집된 뉴스들의 키워드 빈도와 시장 감정 분포를 한눈에 확인합니다.
- **사용자 프로필 관리:** API 키 설정, 관심 분야 선택, 알림 설정 기능 제공
- **완벽한 한국어 지원:** UI 및 분석 결과가 모두 한국어로 제공됩니다.

---

## 🛠 기술 스택

| 구분 | 기술 |
|------|------|
| **Frontend** | React 19, TypeScript, Vite 7, Tailwind CSS 3, TanStack Query, Lucide React |
| **Backend** | FastAPI (Python 3.11+), SQLAlchemy, Pydantic, Uvicorn |
| **AI/Data** | OpenAI API (GPT-4o-mini), NewsAPI, SQLite (aiosqlite) |
| **배포** | Docker, Docker Compose, Nginx |

---

## 📁 프로젝트 구조

```
webapp/
├── frontend/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/       # 공통 컴포넌트 (Header, Footer, Layout)
│   │   ├── features/         # 기능별 컴포넌트 (Dashboard)
│   │   ├── pages/            # 페이지 컴포넌트
│   │   ├── services/         # API 서비스
│   │   └── types/            # TypeScript 타입 정의
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── Dockerfile
├── backend/                  # FastAPI 백엔드
│   ├── app/
│   │   ├── main.py           # FastAPI 엔트리포인트
│   │   ├── models/           # 데이터베이스 모델
│   │   ├── routes/           # API 라우트
│   │   └── services/         # 비즈니스 로직
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml        # Docker Compose 설정
└── README.md
```

---

## 🚀 빌드 및 배포 가이드

### 사전 요구사항

| 요구사항 | 버전 | 비고 |
|----------|------|------|
| Node.js | 18.x 이상 | 프론트엔드 빌드용 |
| npm | 9.x 이상 | 패키지 관리 |
| Python | 3.11 이상 | 백엔드 실행용 |
| Docker | 20.x 이상 | (선택) 컨테이너 배포 |
| Docker Compose | 2.x 이상 | (선택) 멀티 컨테이너 배포 |

---

### 방법 1: 로컬 개발 환경 실행

#### 1️⃣ 환경 변수 설정

`backend/.env` 파일을 생성하고 아래 키를 입력하세요.

```env
# 필수 API 키
OPENAI_API_KEY=sk-your-openai-api-key-here
NEWS_API_KEY=your-newsapi-key-here

# 옵션 설정
USE_MOCK_DATA=False
DATABASE_URL=sqlite+aiosqlite:///./news_insight.db
```

> **📌 API 키 발급:**
> - OpenAI API: https://platform.openai.com/api-keys
> - NewsAPI: https://newsapi.org/register

#### 2️⃣ Backend 실행

```bash
# 프로젝트 디렉토리로 이동
cd backend

# 가상환경 생성 및 활성화 (Linux/Mac)
python -m venv venv
source venv/bin/activate

# 가상환경 생성 및 활성화 (Windows)
python -m venv venv
.\venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt

# 서버 실행
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

백엔드 서버가 http://localhost:8000 에서 실행됩니다.
- API 문서: http://localhost:8000/docs (Swagger UI)
- ReDoc: http://localhost:8000/redoc

#### 3️⃣ Frontend 실행

```bash
# 새 터미널에서 프론트엔드 디렉토리로 이동
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev -- --host
```

프론트엔드가 http://localhost:5173 에서 실행됩니다.

#### 4️⃣ 프론트엔드 프로덕션 빌드

```bash
cd frontend

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

빌드 결과물은 `frontend/dist/` 디렉토리에 생성됩니다.

---

### 방법 2: Docker Compose 배포 (권장)

#### 1️⃣ 환경 변수 설정

```bash
# backend/.env 파일 생성
cat > backend/.env << EOF
OPENAI_API_KEY=sk-your-openai-api-key-here
NEWS_API_KEY=your-newsapi-key-here
USE_MOCK_DATA=False
EOF
```

#### 2️⃣ Docker Compose 실행

```bash
# 프로젝트 루트 디렉토리에서 실행
docker-compose up -d --build
```

#### 3️⃣ 서비스 접속

| 서비스 | URL | 설명 |
|--------|-----|------|
| Frontend | http://localhost | 메인 웹 애플리케이션 |
| Backend API | http://localhost:8000 | REST API |
| API 문서 | http://localhost:8000/docs | Swagger UI |

#### 4️⃣ 로그 확인

```bash
# 전체 로그 확인
docker-compose logs -f

# 백엔드 로그만 확인
docker-compose logs -f backend

# 프론트엔드 로그만 확인
docker-compose logs -f frontend
```

#### 5️⃣ 서비스 관리

```bash
# 서비스 중지
docker-compose stop

# 서비스 재시작
docker-compose restart

# 서비스 완전 삭제 (볼륨 포함)
docker-compose down -v
```

---

### 방법 3: 개별 Docker 빌드

#### Backend Docker 빌드

```bash
cd backend

# 이미지 빌드
docker build -t news-insight-backend .

# 컨테이너 실행
docker run -d \
  --name news-backend \
  -p 8000:8000 \
  -e OPENAI_API_KEY=your-key \
  -e NEWS_API_KEY=your-key \
  news-insight-backend
```

#### Frontend Docker 빌드

```bash
cd frontend

# 이미지 빌드
docker build -t news-insight-frontend .

# 컨테이너 실행
docker run -d \
  --name news-frontend \
  -p 80:80 \
  news-insight-frontend
```

---

## ⚙️ 환경별 설정

### 프론트엔드 환경 변수

| 파일 | 환경 | 설명 |
|------|------|------|
| `.env.development` | 개발 | 로컬 개발 시 사용 |
| `.env.production` | 프로덕션 | 빌드 시 사용 |

```env
# frontend/.env.development
VITE_API_BASE_URL=http://localhost:8000

# frontend/.env.production
VITE_API_BASE_URL=https://api.your-domain.com
```

### 백엔드 환경 변수

| 변수명 | 필수 | 기본값 | 설명 |
|--------|------|--------|------|
| `OPENAI_API_KEY` | ✅ | - | OpenAI API 키 |
| `NEWS_API_KEY` | ✅ | - | NewsAPI 키 |
| `USE_MOCK_DATA` | ❌ | `False` | 목업 데이터 사용 여부 |
| `DATABASE_URL` | ❌ | `sqlite+aiosqlite:///./news_insight.db` | DB 연결 문자열 |

---

## 🔧 트러블슈팅

### 자주 발생하는 문제

#### 1. CORS 에러
백엔드 `app/main.py`에서 CORS 설정을 확인하세요.

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

#### 2. API 키 관련 에러
- `.env` 파일이 올바른 위치에 있는지 확인
- API 키가 유효한지 각 서비스에서 확인
- 환경 변수가 제대로 로드되는지 확인

#### 3. 포트 충돌
```bash
# 사용 중인 포트 확인 (Linux/Mac)
lsof -i :8000
lsof -i :5173

# 프로세스 종료
kill -9 <PID>
```

#### 4. Docker 빌드 실패
```bash
# Docker 캐시 삭제 후 재빌드
docker-compose build --no-cache
```

---

## 📈 시스템 구조

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   NewsAPI   │────▶│   FastAPI   │────▶│   SQLite    │
└─────────────┘     │   Backend   │     │   Database  │
                    └──────┬──────┘     └─────────────┘
                           │
                    ┌──────▼──────┐
                    │  OpenAI API │
                    │  (GPT-4o)   │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │    React    │
                    │  Frontend   │
                    └─────────────┘
```

**데이터 흐름:**
1. NewsAPI에서 최신 뉴스 수집
2. FastAPI 백엔드에서 데이터 처리
3. OpenAI API를 통한 요약 및 감정 분석
4. SQLite에 결과 저장
5. React 프론트엔드에서 시각화

---

## 📄 라이선스

MIT License

---

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with ❤️ by Gemini Agent & Claude