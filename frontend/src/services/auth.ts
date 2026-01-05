import { apiClient } from './api';
import type { User, Token, LoginRequest, RegisterRequest } from '@/types';

// ============================================
// Token Management
// ============================================

const TOKEN_KEY = 'newsInsightToken';
const USER_KEY = 'newsInsightUser';

export const authStorage = {
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  
  removeToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },
  
  getUser: (): User | null => {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },
  
  setUser: (user: User): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  
  removeUser: (): void => {
    localStorage.removeItem(USER_KEY);
  },
  
  clear: (): void => {
    authStorage.removeToken();
    authStorage.removeUser();
  }
};

// ============================================
// Auth API
// ============================================

export const authApi = {
  /**
   * 회원가입
   */
  register: async (data: RegisterRequest): Promise<User> => {
    const response = await apiClient.post<User>('/auth/register', data);
    return response.data;
  },

  /**
   * 로그인
   */
  login: async (data: LoginRequest): Promise<Token> => {
    const response = await apiClient.post<Token>('/auth/login', data);
    const token = response.data;
    
    // Save token
    authStorage.setToken(token.access_token);
    
    return token;
  },

  /**
   * 로그아웃
   */
  logout: (): void => {
    authStorage.clear();
  },

  /**
   * 현재 사용자 정보 가져오기
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/me');
    const user = response.data;
    
    // Save user to localStorage
    authStorage.setUser(user);
    
    return user;
  },

  /**
   * 토큰 유효성 검증
   */
  isTokenValid: (): boolean => {
    const token = authStorage.getToken();
    if (!token) return false;

    try {
      // JWT 토큰의 payload 디코딩 (간단한 검증)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      
      // 만료 시간 확인 (초 단위)
      return exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
};
