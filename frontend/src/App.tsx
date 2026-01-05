import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { DashboardPage } from './pages/DashboardPage';
import { ReportPage } from './pages/ReportPage';

/**
 * QueryClient 설정
 * React Query는 서버에서 가져온 데이터를 관리하는 도구입니다.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

/**
 * 간단한 라우팅 (URL 기반 페이지 전환)
 */
function Router() {
  const path = window.location.pathname;
  
  switch (path) {
    case '/report':
      return <ReportPage />;
    default:
      return <DashboardPage />;
  }
}

/**
 * App 컴포넌트 (최상위 뿌리)
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
