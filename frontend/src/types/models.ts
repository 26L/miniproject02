/**
 * Domain Models
 * 애플리케이션의 핵심 데이터 구조를 정의합니다.
 */

/**
 * 감성 분석 라벨 타입
 * - positive: 긍정
 * - neutral: 중립
 * - negative: 부정
 */
export type SentimentType = 'positive' | 'neutral' | 'negative';

/**
 * 뉴스 카테고리 (향후 확장 대비)
 */
export type NewsCategory = 'Technology' | 'Economy' | 'Politics' | 'Science' | 'Environment' | 'General';

/**
 * 뉴스 아이템 모델
 * DB의 News 테이블과 1:1 매핑되는 구조입니다.
 */
export interface NewsItem {
  /** 고유 ID (Database Primary Key) */
  id: number;
  
  /** 뉴스 제목 */
  title: string;
  
  /** 원문 링크 URL */
  url: string;
  
  /** 뉴스 본문 (크롤링된 텍스트) */
  content: string | null;
  
  /** 대표 이미지 URL */
  image_url: string | null;
  
  /** 원문 발행 일시 (ISO 8601 String) */
  published_at: string | null;
  
  /** AI 3줄 요약 결과 */
  summary: string | null;
  
  /** 감성 분석 결과 (positive/neutral/negative) */
  sentiment_label: SentimentType | null;
  
  /** 감성 점수 (0.0 ~ 1.0, 1에 가까울수록 해당 감성이 강함) */
  sentiment_score: number | null;
  
  /** 추출된 핵심 키워드 리스트 */
  keywords: string[];
  
  /** DB 생성 일시 (수집 일시) */
  created_at: string;
}
