import axios from 'axios';

// 초기 설정: 환경 변수 없이 하드코딩된 로컬 주소 사용 (가장 단순한 형태)
const baseURL = 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
