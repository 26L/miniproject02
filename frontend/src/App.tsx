import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DashboardPage } from './pages/DashboardPage';

/**
 * 1. QueryClient 설정
 * React Query는 서버에서 가져온 데이터를 관리하는 도구입니다.
 * 여기서는 데이터를 가져온 후 5분 동안은 "신선한(Fresh)" 상태로 간주하여
 * 불필요한 재요청을 하지 않도록 설정했습니다.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 브라우저 창을 다시 눌렀을 때 자동으로 새로고침할지 여부
      staleTime: 1000 * 60 * 5,    // 데이터가 유지되는 시간 (5분)
    },
  },
});

/**
 * 2. App 컴포넌트 (최상위 뿌리)
 * 모든 리액트 앱은 하나의 뿌리 컴포넌트에서 시작합니다.
 * QueryClientProvider로 감싸줌으로써 앱 전체에서 데이터를 관리할 수 있게 됩니다.
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 실제 메인 화면인 대시보드 페이지를 렌더링합니다. */}
      <DashboardPage />
    </QueryClientProvider>
  );
}

export default App;
