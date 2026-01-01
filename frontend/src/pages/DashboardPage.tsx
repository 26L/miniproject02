import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { newsApi } from '@/services/news';
import { MainLayout } from '@/components/layout/MainLayout';
import { SearchHero } from '@/features/dashboard/SearchHero';
import { NewsGrid } from '@/features/dashboard/NewsGrid';

export function DashboardPage() {
  const queryClient = useQueryClient();
  const [analyzingId, setAnalyzingId] = useState<number | null>(null);

  // Default query to fetch latest news
  const { data: newsItems = [], isLoading: isInitialLoading } = useQuery({
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
          <h2 className="text-2xl font-bold tracking-tight">Latest Headlines</h2>
        </div>
        
        {isInitialLoading ? (
           <div className="text-center py-20 text-muted-foreground">Loading news...</div>
        ) : (
          <NewsGrid 
            items={newsItems} 
            onAnalyze={handleAnalyze} 
            analyzingId={analyzingId}
          />
        )}
      </div>
    </MainLayout>
  );
}
