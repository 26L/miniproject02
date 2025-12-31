import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { HomePage } from './pages/HomePage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 창 포커스 시 자동 갱신 비활성화 (개발 편의성)
      staleTime: 1000 * 60 * 5, // 5분간 데이터 신선함 유지
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <HomePage />
    </QueryClientProvider>
  );
}

export default App;