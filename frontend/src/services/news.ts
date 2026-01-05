import axios from 'axios';
import { apiClient, getApiKeys, hasValidApiKeys, hasOpenAiApiKey } from './api';
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

// 날짜 범위 계산 함수
const getDateRange = (dateRange?: string): { from: string; to: string } => {
  const now = new Date();
  const to = now.toISOString().split('T')[0]; // 오늘 날짜 (YYYY-MM-DD)
  let from = to;
  
  switch (dateRange) {
    case 'today':
      from = to;
      break;
    case 'week':
      const weekAgo = new Date(now);
      weekAgo.setDate(now.getDate() - 7);
      from = weekAgo.toISOString().split('T')[0];
      break;
    case 'month':
      const monthAgo = new Date(now);
      monthAgo.setMonth(now.getMonth() - 1);
      from = monthAgo.toISOString().split('T')[0];
      break;
    case 'year':
      const yearAgo = new Date(now);
      yearAgo.setFullYear(now.getFullYear() - 1);
      from = yearAgo.toISOString().split('T')[0];
      break;
    default:
      // 기본값: 최근 7일
      const defaultAgo = new Date(now);
      defaultAgo.setDate(now.getDate() - 7);
      from = defaultAgo.toISOString().split('T')[0];
  }
  
  return { from, to };
};

// NewsAPI 응답을 NewsItem으로 변환
const convertNewsApiResponse = (articles: any[]): NewsItem[] => {
  return articles.map((article, index) => ({
    id: index + 1,
    title: article.title || '제목 없음',
    url: article.url || '',
    content: article.content || article.description || '',
    image_url: article.urlToImage || null,
    summary: article.description || null,
    sentiment_label: null, // AI 분석 전
    sentiment_score: null,
    keywords: extractKeywords(article.title, article.description),
    published_at: article.publishedAt || new Date().toISOString(),
    created_at: new Date().toISOString(),
  }));
};

// 간단한 키워드 추출 (제목과 설명에서)
const extractKeywords = (title: string, description: string): string[] => {
  const text = `${title || ''} ${description || ''}`.toLowerCase();
  const stopWords = ['the', 'a', 'an', 'is', 'are', 'was', 'were', 'to', 'of', 'in', 'for', 'on', 'with', 'as', 'by', 'at', 'and', 'or', 'but'];
  const words = text.match(/\b[a-zA-Z가-힣]{3,}\b/g) || [];
  const filtered = words.filter(w => !stopWords.includes(w));
  const uniqueWords = [...new Set(filtered)];
  return uniqueWords.slice(0, 5);
};

export const newsApi = {
  // 뉴스 검색 (NewsAPI /everything 엔드포인트 사용)
  search: async (params: SearchParams | string): Promise<NewsItem[]> => {
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
      
      // 카테고리 필터 시뮬레이션
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
      
      return results;
    }
    
    // NewsAPI 직접 호출
    const apiKeys = getApiKeys();
    const { from, to } = getDateRange(searchParams.dateRange);
    
    try {
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: searchParams.query,
          from: from,
          to: to,
          sortBy: 'publishedAt',
          language: 'en', // 또는 'ko' for Korean
          pageSize: 20,
          apiKey: apiKeys.newsApiKey,
        },
      });
      
      if (response.data?.status === 'ok' && response.data?.articles) {
        return convertNewsApiResponse(response.data.articles);
      }
      return [];
    } catch (error: any) {
      console.error('NewsAPI search error:', error.response?.data || error.message);
      // API 에러 시 더미 데이터로 폴백
      return DUMMY_NEWS.filter(item => 
        item.title.toLowerCase().includes(searchParams.query.toLowerCase())
      );
    }
  },

  // 전체/인기 뉴스 조회 (NewsAPI /top-headlines 엔드포인트 사용)
  getAll: async (limit = 20, _offset = 0): Promise<NewsItem[]> => {
    if (shouldUseDummyData()) {
      await delay(800);
      return DUMMY_NEWS;
    }
    
    const apiKeys = getApiKeys();
    
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          country: 'us', // 또는 'kr' for Korea
          pageSize: limit,
          apiKey: apiKeys.newsApiKey,
        },
      });
      
      if (response.data?.status === 'ok' && response.data?.articles) {
        return convertNewsApiResponse(response.data.articles);
      }
      return [];
    } catch (error: any) {
      console.error('NewsAPI getAll error:', error.response?.data || error.message);
      return DUMMY_NEWS;
    }
  },

  // AI 분석 요청 (OpenAI API 사용 - 백엔드 또는 더미)
  analyze: async (id: number): Promise<NewsItem> => {
    // OpenAI API 키가 없으면 시뮬레이션
    if (!hasOpenAiApiKey()) {
      await delay(1500);
      const item = DUMMY_NEWS.find(n => n.id === id);
      if (!item) throw new Error("Item not found");
      
      return {
        ...item,
        summary: "AI 분석 완료: 이 기사는 주요 이슈에 대한 심층적인 내용을 다루고 있습니다. 핵심 포인트는 현재 상황의 영향과 향후 전망입니다.",
        sentiment_label: item.sentiment_label || "neutral",
        sentiment_score: item.sentiment_score || 0.0
      };
    }
    
    // 백엔드 AI 분석 API 호출
    try {
      const response = await apiClient.post<NewsItem>(`/news/analysis/${id}`);
      return response.data;
    } catch (error) {
      console.error('Analysis error:', error);
      throw new Error('AI 분석에 실패했습니다.');
    }
  },
  
  // 오늘의 인기 뉴스 조회
  getTodayNews: async (limit = 5): Promise<NewsItem[]> => {
    if (shouldUseDummyData()) {
      await delay(500);
      return DUMMY_NEWS.slice(0, limit);
    }
    
    const apiKeys = getApiKeys();
    
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          country: 'us',
          pageSize: limit,
          apiKey: apiKeys.newsApiKey,
        },
      });
      
      if (response.data?.status === 'ok' && response.data?.articles) {
        return convertNewsApiResponse(response.data.articles);
      }
      return DUMMY_NEWS.slice(0, limit);
    } catch (error) {
      console.error('getTodayNews error:', error);
      return DUMMY_NEWS.slice(0, limit);
    }
  },
  
  // 인기 키워드 조회
  getTrendingKeywords: async (limit = 10): Promise<string[]> => {
    if (shouldUseDummyData()) {
      await delay(300);
      const allKeywords = DUMMY_NEWS.flatMap(n => n.keywords);
      const uniqueKeywords = [...new Set(allKeywords)];
      return uniqueKeywords.slice(0, limit);
    }
    
    // 실시간 모드에서는 최신 뉴스에서 키워드 추출
    try {
      const news = await newsApi.getAll(20);
      const allKeywords = news.flatMap(n => n.keywords);
      
      // 키워드 빈도수 계산
      const keywordCount: Record<string, number> = {};
      allKeywords.forEach(kw => {
        keywordCount[kw] = (keywordCount[kw] || 0) + 1;
      });
      
      // 빈도수 순으로 정렬
      const sorted = Object.entries(keywordCount)
        .sort((a, b) => b[1] - a[1])
        .map(([keyword]) => keyword);
      
      return sorted.slice(0, limit);
    } catch (error) {
      console.error('getTrendingKeywords error:', error);
      const allKeywords = DUMMY_NEWS.flatMap(n => n.keywords);
      return [...new Set(allKeywords)].slice(0, limit);
    }
  },
};
