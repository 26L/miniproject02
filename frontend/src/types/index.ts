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
