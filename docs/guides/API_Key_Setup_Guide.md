# 🔑 API Key 발급 및 설정 가이드

**News Insight Pro** 프로젝트의 핵심 기능을 사용하기 위해 필요한 외부 API 키 발급 방법과 프로젝트 적용 단계를 설명합니다.

---

## 1. NewsAPI (뉴스 데이터 수집용)

[NewsAPI](https://newsapi.org/)는 전 세계 뉴스 기사를 검색하고 수집할 수 있는 API를 제공합니다.

1. **사이트 접속:** [https://newsapi.org/register](https://newsapi.org/register)에 접속합니다.
2. **계정 생성:** 이메일, 이름, 비밀번호를 입력하여 가입합니다. (개발자용 무료 플랜 선택)
3. **키 확인:** 가입 완료 후 나타나는 **Your API key** 항목의 문자열을 복사합니다.
4. **제한 사항:** 무료 플랜은 `localhost`에서만 작동하며, 요청 횟수 제한(하루 100건 내외)이 있습니다.

---

## 2. OpenAI API (AI 요약 및 감성 분석용)

[OpenAI API](https://platform.openai.com/)는 GPT 모델을 통해 텍스트를 분석하고 요약하는 데 사용됩니다.

1. **사이트 접속:** [https://platform.openai.com/](https://platform.openai.com/)에 접속하여 로그인합니다.
2. **Billing 설정:** [Settings > Billing](https://platform.openai.com/account/billing)에서 결제 수단을 등록하고 최소 금액($5 이상)을 충전해야 API 사용이 가능합니다.
3. **API 키 생성:** [API Keys](https://platform.openai.com/api-keys) 메뉴에서 **+ Create new secret key** 버튼을 클릭합니다.
4. **키 복사:** 생성된 키는 다시 확인할 수 없으므로 즉시 안전한 곳에 복사해둡니다.

---

## 3. 프로젝트 설정 (.env 파일 작성)

발급받은 키를 프로젝트에 적용하는 단계입니다.

1. **파일 위치:** `backend/` 폴더 아래에 `.env` 파일을 생성합니다. (이미 있다면 수정)
2. **내용 입력:** 아래 형식에 맞춰 발급받은 키를 입력합니다.

```bash
# backend/.env

# OpenAI API Key (sk-... 형식)
OPENAI_API_KEY="여러분의_오픈에이아이_키"

# NewsAPI Key (32자리 영문/숫자 혼합)
NEWS_API_KEY="여러분의_뉴스에이피아이_키"

# Database URL (기본값 유지)
DATABASE_URL="sqlite+aiosqlite:///./news_insight.db"
```

---

## ⚠️ 보안 주의사항

- **절대 커밋 금지:** `.env` 파일은 절대로 Git 저장소(GitHub 등)에 올리지 마세요. (이미 `.gitignore`에 포함되어 있습니다.)
- **키 노출 시:** 만약 키가 외부에 노출되었다면 즉시 해당 서비스 사이트에서 기존 키를 삭제하고 재발급받으세요.
