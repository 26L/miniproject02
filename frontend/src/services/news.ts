import { apiClient, hasValidApiKeys } from './api';
import type { NewsItem } from '@/types';
import { DUMMY_NEWS } from './dummyData';

// API 키가 설정되어 있으면 실제 API 사용, 없으면 더미 데이터 사용
const shouldUseDummyData = () => !hasValidApiKeys();

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 검색 파라미터 인터페이스
export interface SearchParams {
  query: string;
  category?: string;
  dateRange?: string;
}

export const newsApi = {
  // 뉴스 검색 (카테고리, 기간 필터 포함)
  search: async (params: SearchParams | string): Promise<NewsItem[]> => {
    // 문자열로 전달된 경우 객체로 변환 (하위 호환성)
    const searchParams: SearchParams = typeof params === 'string' 
      ? { query: params } 
      : params;
    
    if (shouldUseDummyData()) {
      await delay(600);
      const lowerQuery = searchParams.query.toLowerCase();
      let results = DUMMY_NEWS.filter(item => 
        item.title.toLowerCase().includes(lowerQuery) || 
        (item.summary && item.summary.toLowerCase().includes(lowerQuery)) ||
        item.content.toLowerCase().includes(lowerQuery)
      );
      
      // 카테고리 필터 (더미 데이터에서는 키워드 기반으로 시뮬레이션)
      if (searchParams.category) {
        const categoryKeywords: Record<string, string[]> = {
          politics: ['정치', 'government', 'policy', '정책'],
          economy: ['경제', 'market', 'finance', '금융', 'stocks', 'inflation'],
          society: ['사회', 'community', 'social'],
          technology: ['기술', 'tech', 'AI', 'digital', 'software'],
          sports: ['스포츠', 'sports', 'game', 'match'],
        };
        const keywords = categoryKeywords[searchParams.category] || [];
        if (keywords.length > 0) {
          results = results.filter(item => 
            keywords.some(kw => 
              item.title.toLowerCase().includes(kw.toLowerCase()) ||
              item.content.toLowerCase().includes(kw.toLowerCase()) ||
              item.keywords.some(k => k.toLowerCase().includes(kw.toLowerCase()))
            )
          );
        }
      }
      
      // 기간 필터 (더미 데이터에서는 시뮬레이션)
      if (searchParams.dateRange) {
        const now = new Date();
        const filterDate = new Date();
        
        switch (searchParams.dateRange) {
          case 'today':
            filterDate.setHours(0, 0, 0, 0);
            break;
          case 'week':
            filterDate.setDate(now.getDate() - 7);
            break;
          case 'month':
            filterDate.setMonth(now.getMonth() - 1);
            break;
          case 'year':
            filterDate.setFullYear(now.getFullYear() - 1);
            break;
        }
        
        results = results.filter(item => {
          const itemDate = new Date(item.published_at);
          return itemDate >= filterDate;
        });
      }
      
      return results;
    }
    
    // 실제 API 호출
    const response = await apiClient.post<NewsItem[]>('/news/search', null, {
      params: { 
        query: searchParams.query,
        category: searchParams.category || undefined,
        date_range: searchParams.dateRange || undefined,
      },
    });
    return response.data;
  },

  // 전체 뉴스 조회
  getAll: async (limit = 100, offset = 0): Promise<NewsItem[]> => {
    if (shouldUseDummyData()) {
      await delay(800);
      return DUMMY_NEWS;
    }
    const response = await apiClient.get<NewsItem[]>('/news', {
      params: { limit, offset },
    });
    return response.data;
  },

  // AI 분석 요청
  analyze: async (id: number): Promise<NewsItem> => {
    if (shouldUseDummyData()) {
      await delay(1500);
      const item = DUMMY_NEWS.find(n => n.id === id);
      if (!item) throw new Error("Item not found");
      
      // 요약이 없는 항목에 대해 분석 결과 시뮬레이션
      if (!item.summary) {
         return {
             ...item,
             summary: "AI 분석 완료: 이 기사는 주요 이슈에 대한 심층적인 내용을 다루고 있습니다. 핵심 포인트는 현재 상황의 영향과 향후 전망입니다.",
             sentiment_label: item.sentiment_label || "neutral",
             sentiment_score: item.sentiment_score || 0.0
         };
      }
      return item;
    }
    const response = await apiClient.post<NewsItem>(`/news/analysis/${id}`);
    return response.data;
  },
  
  // 오늘의 인기 뉴스 조회
  getTodayNews: async (limit = 5): Promise<NewsItem[]> => {
    if (shouldUseDummyData()) {
      await delay(500);
      return DUMMY_NEWS.slice(0, limit);
    }
    const response = await apiClient.get<NewsItem[]>('/news/today', {
      params: { limit },
    });
    return response.data;
  },
  
  // 인기 키워드 조회
  getTrendingKeywords: async (limit = 10): Promise<string[]> => {
    if (shouldUseDummyData()) {
      await delay(300);
      // 더미 뉴스에서 키워드 추출
      const allKeywords = DUMMY_NEWS.flatMap(n => n.keywords);
      const uniqueKeywords = [...new Set(allKeywords)];
      return uniqueKeywords.slice(0, limit);
    }
    const response = await apiClient.get<string[]>('/news/trending-keywords', {
      params: { limit },
    });
    return response.data;
  },
};
