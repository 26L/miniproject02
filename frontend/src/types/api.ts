import { NewsItem } from './models';

/**
 * API Data Transfer Objects (DTOs)
 * 백엔드 API와의 통신을 위한 요청/응답 타입을 정의합니다.
 */

// ==========================================
// 1. Common Types (공통)
// ==========================================

/**
 * 공통 에러 응답 구조 (FastAPI Default Error)
 */
export interface ApiErrorResponse {
  detail: string | {
    loc: (string | number)[];
    msg: string;
    type: string;
  }[];
}

/**
 * 목록 조회 시 공통으로 사용되는 페이지네이션 요청 파라미터
 */
export interface PaginationParams {
  skip?: number;  // 건너뛸 개수 (Offset)
  limit?: number; // 가져올 개수 (Limit)
}

// ==========================================
// 2. News API Types (뉴스 관련)
// ==========================================

/**
 * [POST] /news/search
 * 뉴스 검색 요청
 */
export interface SearchNewsRequest {
  query: string; // 검색어
}

/**
 * [GET] /news
 * 뉴스 목록 조회 요청 (필터링 및 페이징 포함)
 */
export interface GetNewsListRequest extends PaginationParams {
  sort_by?: 'latest' | 'sentiment_score'; // 정렬 기준 (예정)
  order?: 'desc' | 'asc';                 // 정렬 순서 (예정)
}

// ==========================================
// 3. Response Types (응답)
// ==========================================

/** 검색 결과 응답 */
export type SearchNewsResponse = NewsItem[];

/** 목록 조회 응답 */
export type GetNewsListResponse = NewsItem[];

/** AI 분석 결과 응답 */
export type AnalyzeNewsResponse = NewsItem;