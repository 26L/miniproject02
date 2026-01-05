import { apiClient } from './api';
import type { NewsItem } from '@/types';

// 검색 파라미터 인터페이스
export interface SearchParams {
  query: string;
  category?: string;
  dateRange?: string;
}

/**
 * News API Service
 * 모든 뉴스 관련 API 호출을 백엔드를 통해 처리합니다.
 * 백엔드가 NewsAPI 및 OpenAI API와 통신하며, API 키는 서버 측에서 관리됩니다.
 */
export const newsApi = {
  /**
   * 뉴스 검색
   * 백엔드 POST /api/v1/news/search 엔드포인트 호출
   * 백엔드에서 NewsAPI를 통해 뉴스를 검색하고 DB에 저장합니다.
   */
  search: async (params: SearchParams | string): Promise<NewsItem[]> => {
    const searchParams: SearchParams = typeof params === 'string' 
      ? { query: params } 
      : params;
    
    try {
      const response = await apiClient.post<NewsItem[]>('/news/search', null, {
        params: {
          query: searchParams.query,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Backend search error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.detail || '뉴스 검색에 실패했습니다.');
    }
  },

  /**
   * 저장된 뉴스 목록 조회
   * 백엔드 GET /api/v1/news 엔드포인트 호출
   * DB에 저장된 뉴스를 최신순으로 조회합니다.
   */
  getAll: async (limit = 20, offset = 0): Promise<NewsItem[]> => {
    try {
      const response = await apiClient.get<NewsItem[]>('/news', {
        params: { skip: offset, limit },
      });
      return response.data;
    } catch (error: any) {
      console.error('Backend getAll error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.detail || '뉴스 목록을 불러오는데 실패했습니다.');
    }
  },

  /**
   * AI 분석 요청
   * 백엔드 POST /api/v1/news/analysis/{id} 엔드포인트 호출
   * 백엔드에서 OpenAI API를 사용하여 뉴스를 분석하고 DB를 업데이트합니다.
   */
  analyze: async (id: number): Promise<NewsItem> => {
    try {
      const response = await apiClient.post<NewsItem>(`/news/analysis/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Backend analysis error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.detail || 'AI 분석에 실패했습니다.');
    }
  },
};
