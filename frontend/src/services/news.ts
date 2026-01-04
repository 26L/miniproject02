import { apiClient } from './api';
import type { NewsItem } from '@/types';
import { DUMMY_NEWS } from './dummyData';

const USE_DUMMY_DATA = true;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const newsApi = {
  search: async (query: string): Promise<NewsItem[]> => {
    if (USE_DUMMY_DATA) {
      await delay(600);
      const lowerQuery = query.toLowerCase();
      return DUMMY_NEWS.filter(item => 
        item.title.toLowerCase().includes(lowerQuery) || 
        (item.summary && item.summary.toLowerCase().includes(lowerQuery)) ||
        item.content.toLowerCase().includes(lowerQuery)
      );
    }
    const response = await apiClient.post<NewsItem[]>('/news/search', null, {
      params: { query },
    });
    return response.data;
  },

  getAll: async (limit = 100, offset = 0): Promise<NewsItem[]> => {
    if (USE_DUMMY_DATA) {
      await delay(800);
      return DUMMY_NEWS;
    }
    const response = await apiClient.get<NewsItem[]>('/news', {
      params: { limit, offset },
    });
    return response.data;
  },

  analyze: async (id: number): Promise<NewsItem> => {
    if (USE_DUMMY_DATA) {
      await delay(1500);
      const item = DUMMY_NEWS.find(n => n.id === id);
      if (!item) throw new Error("Item not found");
      
      // Simulate analysis result if not already present
      // For the item without summary (id 3), let's "generate" one
      if (id === 3 && !item.summary) {
         return {
             ...item,
             summary: "Analysis complete: The traffic situation was caused by multiple system failures. Authorities are working on a resolution.",
             sentiment_label: "negative",
             sentiment_score: -0.8
         };
      }
      return item;
    }
    const response = await apiClient.post<NewsItem>(`/news/analysis/${id}`);
    return response.data;
  },
};
