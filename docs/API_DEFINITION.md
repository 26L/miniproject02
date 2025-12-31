# News Insight Pro - API Definition

이 문서는 백엔드(FastAPI)와 프론트엔드(React) 간의 데이터 통신 규격을 정의합니다.

## 1. Base URL
- **Development:** `http://localhost:8000/api/v1`
- **Prefix:** `/news`

---

## 2. Endpoints

### 2.1 뉴스 검색 및 저장 (Search & Crawl)
- **Method:** `POST`
- **Path:** `/search`
- **Description:** 외부 뉴스 API(NewsAPI)를 통해 뉴스를 검색하고, 중복되지 않은 데이터를 DB에 저장합니다.
- **Parameters (Query):**
    - `query` (string, required): 검색하고 싶은 키워드 (예: "Tesla", "AI")
- **Response:** `Array<NewsItem>` (검색 및 저장된 뉴스 목록)

### 2.2 뉴스 목록 조회 (Read List)
- **Method:** `GET`
- **Path:** `/`
- **Description:** DB에 저장된 뉴스 목록을 페이징하여 조회합니다.
- **Parameters (Query):**
    - `skip` (integer, optional): 건너뛸 데이터 개수 (Default: 0)
    - `limit` (integer, optional): 한 번에 가져올 데이터 개수 (Default: 100)
- **Response:** `Array<NewsItem>`

### 2.3 AI 분석 요청 (Analyze)
- **Method:** `POST`
- **Path:** `/analysis/{news_id}`
- **Description:** 특정 뉴스의 요약 및 감성 분석을 AI(OpenAI)에 요청하고 결과를 업데이트합니다.
- **Parameters (Path):**
    - `news_id` (integer, required): 분석할 뉴스 ID
- **Response:** `NewsItem` (분석 결과가 반영된 객체)

---

## 3. Data Schema

### 3.1 NewsItem (Core Model)

| Field | Type | Nullable | Description |
| --- | --- | --- | --- |
| `id` | `integer` | No | 고유 식별자 (PK) |
| `title` | `string` | No | 뉴스 제목 |
| `url` | `string` | No | 원문 링크 |
| `content` | `string` | Yes | 뉴스 본문 |
| `image_url` | `string` | Yes | 썸네일 이미지 URL |
| `published_at` | `string` | Yes | 발행 일시 (ISO 8601) |
| `summary` | `string` | Yes | **[AI]** 3줄 요약 텍스트 |
| `sentiment_label` | `string` | Yes | **[AI]** 감성 라벨 (`positive`, `neutral`, `negative`) |
| `sentiment_score` | `float` | Yes | **[AI]** 감성 점수 (0.0 ~ 1.0) |
| `keywords` | `List[str]` | No | **[NLP]** 추출된 키워드 배열 |
| `created_at` | `string` | No | 데이터 수집(생성) 일시 |

### 3.2 Error Response (FastAPI Standard)
```json
{
  "detail": [
    {
      "loc": ["query", "page"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```