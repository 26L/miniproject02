import type { NewsItem } from '@/types';

export const DUMMY_NEWS: NewsItem[] = [
  {
    id: 1,
    title: "Global Markets Rally as Inflation Cools",
    url: "https://example.com/markets-rally",
    content: "Global stock markets saw a significant boost today as the latest inflation reports showed a faster-than-expected cooling. Tech stocks led the charge...",
    image_url: "https://placehold.co/600x400",
    summary: "Markets rallied worldwide following positive inflation data, with technology stocks seeing the highest gains. Analysts predict a continued upward trend for the next quarter.",
    sentiment_label: "positive",
    sentiment_score: 0.85,
    keywords: ["finance", "stocks", "inflation", "tech"],
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "New AI Model Surpasses Human Performance in Medical Diagnosis",
    url: "https://example.com/ai-medical-breakthrough",
    content: "Researchers have unveiled a new artificial intelligence model that demonstrates higher accuracy than human specialists in diagnosing early-stage diseases...",
    image_url: null,
    summary: "A groundbreaking AI model has been developed that outperforms human doctors in early disease diagnosis, marking a significant milestone in medical technology.",
    sentiment_label: "positive",
    sentiment_score: 0.92,
    keywords: ["AI", "health", "technology", "medicine"],
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    title: "Major City Faces Unprecedented Traffic Gridlock",
    url: "https://example.com/traffic-chaos",
    content: "Commuters in the capital faced hours of delays this morning as a series of accidents and system failures caused a complete standstill...",
    image_url: "https://placehold.co/600x400/red/white",
    summary: null, // To test "Analyze" button visibility
    sentiment_label: "negative",
    sentiment_score: -0.65,
    keywords: ["traffic", "infrastructure", "delays"],
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    title: "Tech Giant Announces Quarterly Earnings",
    url: "https://example.com/earnings-report",
    content: "The quarterly earnings report released today met analyst expectations, showing steady growth in cloud services but a slight dip in hardware sales...",
    image_url: null,
    summary: "Quarterly earnings met expectations with mixed results: cloud growth offset by hardware decline. Stock prices remained stable in after-hours trading.",
    sentiment_label: "neutral",
    sentiment_score: 0.05,
    keywords: ["business", "earnings", "tech"],
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    created_at: new Date().toISOString()
  },
  {
    id: 5,
    title: "Local Community Garden Wins National Award",
    url: "https://example.com/garden-award",
    content: "The downtown community garden project has been recognized with the National Green Initiative Award for its contribution to urban sustainability...",
    image_url: "https://placehold.co/600x400/green/white",
    summary: "A local community garden received a national award for urban sustainability, highlighting the success of grassroots environmental efforts.",
    sentiment_label: "positive",
    sentiment_score: 0.78,
    keywords: ["community", "environment", "awards"],
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    created_at: new Date().toISOString()
  }
];
