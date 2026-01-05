import axios from 'axios';

// API 키 관리 인터페이스
export interface ApiKeys {
  newsApiKey: string;
  openAiApiKey: string;
}

// LocalStorage에서 API 키 로드
export const getApiKeys = (): ApiKeys => {
  const saved = localStorage.getItem('newsAnalyzerApiKeys');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return { newsApiKey: '', openAiApiKey: '' };
    }
  }
  return { newsApiKey: '', openAiApiKey: '' };
};

// News API 키만 있으면 뉴스 검색 가능
export const hasNewsApiKey = (): boolean => {
  const keys = getApiKeys();
  return !!keys.newsApiKey;
};

// OpenAI API 키가 있으면 AI 분석 가능
export const hasOpenAiApiKey = (): boolean => {
  const keys = getApiKeys();
  return !!keys.openAiApiKey;
};

// API 키 유효성 체크 (설정 여부) - 뉴스 API 키만 있어도 실시간 모드
export const hasValidApiKeys = (): boolean => {
  return hasNewsApiKey();
};

// 초기 설정: 백엔드 API 또는 로컬 주소 사용
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// 백엔드 API 클라이언트
export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// NewsAPI 직접 호출 클라이언트
export const newsApiClient = axios.create({
  baseURL: 'https://newsapi.org/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 백엔드 요청 인터셉터: API 키를 헤더에 추가
apiClient.interceptors.request.use(
  (config) => {
    const apiKeys = getApiKeys();
    
    if (apiKeys.newsApiKey) {
      config.headers['X-News-Api-Key'] = apiKeys.newsApiKey;
    }
    if (apiKeys.openAiApiKey) {
      config.headers['X-OpenAI-Api-Key'] = apiKeys.openAiApiKey;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 에러 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.response?.status === 401) {
      console.error('API Key authentication failed. Please check your API keys.');
    }
    
    return Promise.reject(error);
  }
);

// API 키 검증 함수
export const validateApiKey = async (keyType: 'news' | 'openai', apiKey: string): Promise<boolean> => {
  if (keyType === 'news') {
    // NewsAPI 키 검증: 실제 API 호출로 테스트
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          apiKey: apiKey,
          country: 'us',
          pageSize: 1,
        },
      });
      return response.data?.status === 'ok';
    } catch (error: any) {
      // 401 에러면 키가 잘못됨
      if (error.response?.status === 401) {
        return false;
      }
      // 다른 에러(네트워크 등)면 형식만 체크
      return /^[a-zA-Z0-9]{32}$/.test(apiKey);
    }
  } else if (keyType === 'openai') {
    // OpenAI 키는 형식만 체크 (실제 호출은 비용 발생)
    return apiKey.startsWith('sk-') && apiKey.length >= 40;
  }
  return false;
};
