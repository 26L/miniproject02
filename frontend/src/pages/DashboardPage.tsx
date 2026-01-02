import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { newsApi } from '@/services/news';
import { MainLayout } from '@/components/layout/MainLayout';
import { SearchHero } from '@/features/dashboard/SearchHero';
import { NewsGrid } from '@/features/dashboard/NewsGrid';
import { TrendPanel } from '@/features/dashboard/TrendPanel';

export function DashboardPage() {
  const queryClient = useQueryClient();
  const [analyzingId, setAnalyzingId] = useState<number | null>(null);

  // Default query to fetch latest news
  const { data: newsItems = [], isLoading: isInitialLoading, error } = useQuery({
    queryKey: ['news', 'latest'],
    queryFn: () => newsApi.getAll(20),
  });

  // Search mutation
  const searchMutation = useMutation({
    mutationFn: newsApi.search,
    onSuccess: (data) => {
      // Update the cache with search results
      queryClient.setQueryData(['news', 'latest'], data);
    },
  });

  // Analysis mutation
  const analyzeMutation = useMutation({
    mutationFn: newsApi.analyze,
    onMutate: (id) => {
      setAnalyzingId(id);
    },
    onSuccess: (updatedNews) => {
      // Update the item in the list
      queryClient.setQueryData(['news', 'latest'], (oldData: any[]) => {
        return oldData?.map((item) => 
          item.id === updatedNews.id ? updatedNews : item
        );
      });
    },
    onSettled: () => {
      setAnalyzingId(null);
    }
  });

  const handleSearch = (query: string) => {
    searchMutation.mutate(query);
  };

  const handleAnalyze = (id: number) => {
    analyzeMutation.mutate(id);
  };

  return (
    <MainLayout>
      <SearchHero 
        onSearch={handleSearch} 
        isLoading={searchMutation.isPending} 
      />
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">최신 뉴스</h2>
        </div>
        
        {isInitialLoading ? (
           <div className="text-center py-20 text-muted-foreground">뉴스 불러오는 중...</div>
        ) : error ? (
           <div className="text-center py-20 text-destructive bg-destructive/10 rounded-xl">
             <p className="font-semibold">뉴스 로딩 실패</p>
             <p className="text-sm">
               {(error as any)?.message || '알 수 없는 오류'}
               {(error as any)?.response?.status && ` (상태 코드: ${(error as any).response.status})`}
             </p>
             <p className="text-xs text-muted-foreground mt-2">백엔드 콘솔을 확인해주세요.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <NewsGrid 
                items={newsItems} 
                onAnalyze={handleAnalyze} 
                analyzingId={analyzingId}
              />
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <TrendPanel items={newsItems} />
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
