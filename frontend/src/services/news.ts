import { apiClient } from './api';
import type { NewsItem } from '@/types';

export const newsApi = {
  search: async (query: string): Promise<NewsItem[]> => {
    const response = await apiClient.post<NewsItem[]>('/news/search', null, {
      params: { query },
    });
    return response.data;
  },

  getAll: async (limit = 100, offset = 0): Promise<NewsItem[]> => {
    const response = await apiClient.get<NewsItem[]>('/news/', {
      params: { limit, offset },
    });
    return response.data;
  },

  analyze: async (id: number): Promise<NewsItem> => {
    const response = await apiClient.post<NewsItem>(`/news/analysis/${id}`);
    return response.data;
  },
};
