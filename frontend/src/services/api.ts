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

// API 키 유효성 체크 (설정 여부)
export const hasValidApiKeys = (): boolean => {
  const keys = getApiKeys();
  return !!(keys.newsApiKey && keys.openAiApiKey);
};

// 초기 설정: 환경 변수 또는 로컬 주소 사용
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: API 키를 헤더에 추가
apiClient.interceptors.request.use(
  (config) => {
    const apiKeys = getApiKeys();
    
    // API 키가 있으면 헤더에 추가
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
    
    // API 키 관련 에러 처리
    if (error.response?.status === 401) {
      console.error('API Key authentication failed. Please check your API keys.');
    }
    
    return Promise.reject(error);
  }
);

// API 키 검증 함수 (백엔드에 실제 검증 요청)
export const validateApiKey = async (keyType: 'news' | 'openai', apiKey: string): Promise<boolean> => {
  try {
    const response = await apiClient.post('/validate-key', {
      key_type: keyType,
      api_key: apiKey,
    });
    return response.data?.valid === true;
  } catch (error) {
    // 백엔드 엔드포인트가 없으면 기본 검증 (키 형식 체크)
    if (keyType === 'news') {
      // NewsAPI 키는 32자 영숫자
      return /^[a-zA-Z0-9]{32}$/.test(apiKey);
    } else if (keyType === 'openai') {
      // OpenAI 키는 sk-로 시작하고 충분한 길이
      return apiKey.startsWith('sk-') && apiKey.length >= 40;
    }
    return false;
  }
};
