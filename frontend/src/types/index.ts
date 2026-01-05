export interface NewsItem {
  id: number;
  title: string;
  url: string;
  content: string;
  image_url: string | null;
  summary: string | null;
  sentiment_label: 'positive' | 'neutral' | 'negative' | null;
  sentiment_score: number | null;
  keywords: string[]; // Array of strings
  published_at: string;
  created_at: string;
}

export interface SearchResponse {
  items: NewsItem[];
  total: number;
}

// ============================================
// Authentication Types
// ============================================

export interface User {
  id: number;
  email: string;
  username: string;
  full_name: string | null;
  is_active: boolean;
  is_superuser: boolean;
  created_at: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  full_name?: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
