import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { newsApi } from '../api/news';
import { NewsItem } from '../types';

export const useNewsList = () => {
  return useQuery({
    queryKey: ['news'],
    queryFn: newsApi.getNewsList,
  });
};

export const useTrendingNews = () => {
  return useQuery({
    queryKey: ['news', 'trending'],
    queryFn: newsApi.getTrendingNews,
  });
};

export const useSearchNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (query: string) => newsApi.searchNews(query),
    onSuccess: () => {
      // 검색 성공 시 뉴스 목록 갱신
      // 방법 1: 리스트 전체 무효화 (가장 안전)
      queryClient.invalidateQueries({ queryKey: ['news'] });
      toast.success('뉴스를 성공적으로 검색했습니다!');
    },
    onError: (error) => {
      console.error(error);
      toast.error('뉴스 검색 중 오류가 발생했습니다.');
    }
  });
};

export const useAnalyzeNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => newsApi.analyzeNews(id),
    onSuccess: (updatedNews) => {
      // 분석 성공 시 해당 아이템만 업데이트
      queryClient.setQueryData(['news'], (old: NewsItem[] | undefined) => {
        if (!old) return [];
        return old.map((item) => 
          item.id === updatedNews.id ? updatedNews : item
        );
      });
      toast.success('AI 분석이 완료되었습니다!');
    },
    onError: (error) => {
      console.error(error);
      toast.error('AI 분석 중 오류가 발생했습니다.');
    }
  });
};
