import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, authStorage } from '@/services/auth';
import type { User, LoginRequest, RegisterRequest, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // 초기 로드 시 로컬스토리지에서 인증 상태 복원
  useEffect(() => {
    const initAuth = async () => {
      const token = authStorage.getToken();
      const user = authStorage.getUser();

      if (token && authApi.isTokenValid()) {
        setState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });

        // 백엔드에서 최신 사용자 정보 가져오기
        try {
          const freshUser = await authApi.getCurrentUser();
          setState({
            user: freshUser,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Failed to refresh user:', error);
          // 토큰이 유효하지 않으면 로그아웃
          authStorage.clear();
          setState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } else {
        setState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    initAuth();
  }, []);

  const login = async (data: LoginRequest) => {
    try {
      const tokenResponse = await authApi.login(data);
      const user = await authApi.getCurrentUser();

      setState({
        user,
        token: tokenResponse.access_token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      await authApi.register(data);
      // 회원가입 후 자동 로그인
      await login({
        username: data.username,
        password: data.password,
      });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    authApi.logout();
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const refreshUser = async () => {
    try {
      const user = await authApi.getCurrentUser();
      setState((prev) => ({
        ...prev,
        user,
      }));
    } catch (error) {
      console.error('Failed to refresh user:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
