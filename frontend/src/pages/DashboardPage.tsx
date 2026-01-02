import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { newsApi } from '@/services/news';
import { MainLayout } from '@/components/layout/MainLayout';
import { SearchHero } from '@/features/dashboard/SearchHero';
import { NewsGrid } from '@/features/dashboard/NewsGrid';
import { TrendPanel } from '@/features/dashboard/TrendPanel';

/**
 * DashboardPage: 앱의 메인 대화형 페이지입니다.
 * 이 안에서 뉴스 목록을 불러오고, 검색하고, AI 분석을 요청하는 모든 일이 일어납니다.
 */
export function DashboardPage() {
  // queryClient: 이미 가져온 데이터를 수동으로 업데이트할 때 사용합니다.
  const queryClient = useQueryClient();

  // useState: 리액트의 '기억 장치'입니다. 현재 어떤 뉴스를 분석 중인지 ID를 저장합니다.
  const [analyzingId, setAnalyzingId] = useState<number | null>(null);

  /**
   * 1. 데이터 가져오기 (GET) - useQuery
   * 페이지가 열리자마자 백엔드에서 최신 뉴스 20개를 가져옵니다.
   * data: 결과값, isLoading: 로딩 여부, error: 에러 정보가 자동으로 담깁니다.
   */
  const { data: newsItems = [], isLoading: isInitialLoading, error } = useQuery({
    queryKey: ['news', 'latest'], // 이 요청의 고유 이름
    queryFn: () => newsApi.getAll(20), // 실제 실행할 함수
  });

  /**
   * 2. 검색하기 (POST/Action) - useMutation
   * 사용자가 검색 버튼을 눌렀을 때만 실행되는 '액션'입니다.
   */
  const searchMutation = useMutation({
    mutationFn: newsApi.search,
    onSuccess: (data) => {
      // 검색이 성공하면, 기존 뉴스 목록 데이터를 검색 결과로 바꿔치기합니다.
      queryClient.setQueryData(['news', 'latest'], data);
    },
  });

  /**
   * 3. AI 분석하기 (POST/Update) - useMutation
   * 특정 뉴스의 분석 버튼을 눌렀을 때 실행됩니다.
   */
  const analyzeMutation = useMutation({
    mutationFn: newsApi.analyze,
    onMutate: (id) => {
      // 분석 시작 시, 현재 분석 중인 ID를 저장하여 버튼에 로딩 표시를 합니다.
      setAnalyzingId(id);
    },
    onSuccess: (updatedNews) => {
      // 분석이 끝나면, 전체 뉴스 목록 중에서 해당 뉴스만 새 데이터(요약 등)로 교체합니다.
      queryClient.setQueryData(['news', 'latest'], (oldData: any[]) => {
        return oldData?.map((item) => 
          item.id === updatedNews.id ? updatedNews : item
        );
      });
    },
    onSettled: () => {
      // 성공하든 실패하든 로딩 상태를 해제합니다.
      setAnalyzingId(null);
    }
  });

  // 검색 실행 함수
  const handleSearch = (query: string) => {
    searchMutation.mutate(query);
  };

  // 분석 실행 함수
  const handleAnalyze = (id: number) => {
    analyzeMutation.mutate(id);
  };

  return (
    <MainLayout>
      {/* 상단 검색 영역 */}
      <SearchHero 
        onSearch={handleSearch} 
        isLoading={searchMutation.isPending} 
      />
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">최신 뉴스</h2>
        </div>
        
        {/* 1. 로딩 중일 때 보여줄 화면 */}
        {isInitialLoading ? (
           <div className="text-center py-20 text-muted-foreground">뉴스 불러오는 중...</div>
        ) : 
        /* 2. 에러가 났을 때 보여줄 화면 */
        error ? (
           <div className="text-center py-20 text-destructive bg-destructive/10 rounded-xl">
             <p className="font-semibold">뉴스 로딩 실패</p>
             <p className="text-sm">
               {(error as any)?.message || '알 수 없는 오류'}
               {(error as any)?.response?.status && ` (상태 코드: ${(error as any).response.status})`}
             </p>
           </div>
        ) : (
          /* 3. 정상적으로 데이터를 가져왔을 때의 2단 레이아웃 */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 좌측: 뉴스 카드 목록 (2/3 너비) */}
            <div className="lg:col-span-2">
              <NewsGrid 
                items={newsItems} 
                onAnalyze={handleAnalyze} 
                analyzingId={analyzingId}
              />
            </div>
            {/* 우측: 트렌드 통계 패널 (1/3 너비, 화면에 고정) */}
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
