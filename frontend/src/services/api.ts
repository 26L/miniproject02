import axios from 'axios';

/**
 * Backend API Client
 * 
 * API 키는 백엔드 서버의 .env 파일에서 관리됩니다.
 * 프론트엔드는 백엔드를 통해서만 외부 API(NewsAPI, OpenAI)에 접근합니다.
 * 이를 통해 API 키 보안을 강화하고 중앙 집중식 Rate Limiting을 적용합니다.
 */

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// 백엔드 API 클라이언트
export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30초 타임아웃
});

// 요청 인터셉터: JWT 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    // localStorage에서 JWT 토큰 가져오기
    const token = localStorage.getItem('newsInsightToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    console.error('Backend API Error:', error);
    
    if (error.response?.status === 401) {
      console.error('Unauthorized. Please login again.');
      // 로그아웃 처리 (토큰 제거)
      localStorage.removeItem('newsInsightToken');
      localStorage.removeItem('newsInsightUser');
    } else if (error.response?.status === 503) {
      console.error('Backend service unavailable. Please check API keys in backend/.env');
    } else if (error.response?.status === 500) {
      console.error('Backend internal server error:', error.response?.data);
    }
    
    return Promise.reject(error);
  }
);
