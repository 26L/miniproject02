import { apiClient } from './client';
import { NewsItem } from '../types';

export const newsApi = {
  // 뉴스 검색 (크롤링 및 저장)
  searchNews: async (query: string): Promise<NewsItem[]> => {
    const response = await apiClient.post<NewsItem[]>('/news/search', null, {
      params: { query },
    });
    return response.data;
  },

  // 뉴스 목록 조회
  getNewsList: async (): Promise<NewsItem[]> => {
    const response = await apiClient.get<NewsItem[]>('/news/');
    return response.data;
  },

  // 추천 뉴스 (최신 뉴스 5개)
  getTrendingNews: async (): Promise<NewsItem[]> => {
    const response = await apiClient.get<NewsItem[]>('/news/', {
      params: { limit: 5 }
    });
    return response.data;
  },

  // AI 분석 요청
  analyzeNews: async (id: number): Promise<NewsItem> => {
    const response = await apiClient.post<NewsItem>(`/news/analysis/${id}`);
    return response.data;
  },
};
