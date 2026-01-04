import { useState, useEffect, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { newsApi } from '@/services/news';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchArea } from '@/features/dashboard/SearchArea';
import { ProfilePanel, type UserProfile } from '@/features/dashboard/ProfilePanel';
import { TodayNewsPanel, type TodayNewsItem } from '@/features/dashboard/TodayNewsPanel';
import { TrendKeywordsPanel } from '@/features/dashboard/TrendPanel';
import { SentimentPanel, type SentimentData } from '@/features/dashboard/SentimentPanel';
import { NewsGrid } from '@/features/dashboard/NewsGrid';
import { ProfileModal, type ApiKeys } from '@/features/dashboard/ProfileModal';
import type { NewsItem } from '@/types';

// Default profile data
const DEFAULT_PROFILE: UserProfile = {
  name: '사용자',
  email: 'user@example.com',
  avatar: null,
  interests: ['technology', 'economy', 'society'],
  stats: {
    searches: 0,
    bookmarks: 0,
    readArticles: 0,
  },
};

// Default API keys
const DEFAULT_API_KEYS: ApiKeys = {
  newsApiKey: '',
  openAiApiKey: '',
};

// Today's news mock data
const TODAY_NEWS: TodayNewsItem[] = [
  { id: 1, title: '2024년 경제 전망, 전문가들의 분석', source: '매일경제', date: '오늘' },
  { id: 2, title: 'AI 기술 발전이 일상에 미치는 영향', source: 'IT동아', date: '오늘' },
  { id: 3, title: '글로벌 기후 변화 대응 정책 논의', source: '한국일보', date: '오늘' },
  { id: 4, title: '국내 스타트업 투자 동향 분석', source: '조선비즈', date: '오늘' },
  { id: 5, title: '헬스케어 산업의 디지털 전환 가속화', source: 'SBS뉴스', date: '오늘' },
];

// Trending keywords
const DEFAULT_KEYWORDS = [
  '인공지능', '기후변화', '경제정책', '반도체', '전기차',
  '메타버스', '블록체인', '헬스케어', '부동산', '금리',
  '환율', '증시', 'AI 규제', '탄소중립', '디지털전환'
];

export function DashboardPage() {
  const queryClient = useQueryClient();

  // State
  const [analyzingId, setAnalyzingId] = useState<number | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [apiKeys, setApiKeys] = useState<ApiKeys>(DEFAULT_API_KEYS);
  const [todayNews, setTodayNews] = useState<TodayNewsItem[]>(TODAY_NEWS);
  const [trendKeywords, setTrendKeywords] = useState<string[]>(DEFAULT_KEYWORDS.slice(0, 8));
  const [isKeywordsLoading, setIsKeywordsLoading] = useState(false);
  const [isTodayNewsLoading, setIsTodayNewsLoading] = useState(false);
  // searchQuery is used by child components when clicking keywords or today's news
  const [_searchQuery, setSearchQuery] = useState('');

  // Load profile and API keys from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('newsAnalyzerProfile');
    if (saved) {
      try {
        setProfile({ ...DEFAULT_PROFILE, ...JSON.parse(saved) });
      } catch (e) {
        console.error('Failed to load profile:', e);
      }
    }

    const savedBookmarks = localStorage.getItem('newsAnalyzerBookmarks');
    if (savedBookmarks) {
      try {
        setBookmarkedIds(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error('Failed to load bookmarks:', e);
      }
    }

    // Load API keys from localStorage
    const savedApiKeys = localStorage.getItem('newsAnalyzerApiKeys');
    if (savedApiKeys) {
      try {
        setApiKeys({ ...DEFAULT_API_KEYS, ...JSON.parse(savedApiKeys) });
      } catch (e) {
        console.error('Failed to load API keys:', e);
      }
    }
  }, []);

  // Save profile to localStorage
  const saveProfile = useCallback((newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('newsAnalyzerProfile', JSON.stringify(newProfile));
  }, []);

  // Save API keys to localStorage
  const saveApiKeys = useCallback((newApiKeys: ApiKeys) => {
    setApiKeys(newApiKeys);
    localStorage.setItem('newsAnalyzerApiKeys', JSON.stringify(newApiKeys));
  }, []);

  // Fetch news
  const { data: newsItems = [], isLoading: isInitialLoading, error } = useQuery({
    queryKey: ['news', 'latest'],
    queryFn: () => newsApi.getAll(20),
  });

  // Search mutation
  const searchMutation = useMutation({
    mutationFn: newsApi.search,
    onSuccess: (data) => {
      queryClient.setQueryData(['news', 'latest'], data);
      // Update search stats
      setProfile(prev => {
        const updated = { ...prev, stats: { ...prev.stats, searches: prev.stats.searches + 1 } };
        localStorage.setItem('newsAnalyzerProfile', JSON.stringify(updated));
        return updated;
      });
    },
  });

  // Analyze mutation
  const analyzeMutation = useMutation({
    mutationFn: newsApi.analyze,
    onMutate: (id) => setAnalyzingId(id),
    onSuccess: (updatedNews) => {
      queryClient.setQueryData(['news', 'latest'], (oldData: NewsItem[]) => 
        oldData?.map((item) => item.id === updatedNews.id ? updatedNews : item)
      );
    },
    onSettled: () => setAnalyzingId(null),
  });

  // Event handlers
  const handleSearch = (query: string, _category: string, _dateRange: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      searchMutation.mutate(query);
    }
  };

  const handleAnalyze = (id: number) => {
    analyzeMutation.mutate(id);
  };

  const handleBookmark = (id: number) => {
    setBookmarkedIds(prev => {
      const updated = prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : [...prev, id];
      localStorage.setItem('newsAnalyzerBookmarks', JSON.stringify(updated));
      
      // Update bookmark stats if adding
      if (!prev.includes(id)) {
        setProfile(p => {
          const updatedProfile = { ...p, stats: { ...p.stats, bookmarks: p.stats.bookmarks + 1 } };
          localStorage.setItem('newsAnalyzerProfile', JSON.stringify(updatedProfile));
          return updatedProfile;
        });
      }
      
      return updated;
    });
  };

  const handleShare = async (id: number) => {
    const news = newsItems.find(n => n.id === id);
    if (!news) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: news.title,
          text: news.summary || news.content.substring(0, 100),
          url: news.url,
        });
      } catch (e) {
        console.error('Share failed:', e);
      }
    } else {
      await navigator.clipboard.writeText(news.url);
      alert('링크가 복사되었습니다');
    }
  };

  const handleTodayNewsClick = (title: string) => {
    const keywords = title.split(' ').slice(0, 3).join(' ');
    setSearchQuery(keywords);
    searchMutation.mutate(keywords);
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
    searchMutation.mutate(keyword);
  };

  const refreshTodayNews = async () => {
    setIsTodayNewsLoading(true);
    await new Promise(r => setTimeout(r, 500));
    setTodayNews([...TODAY_NEWS].sort(() => Math.random() - 0.5));
    setIsTodayNewsLoading(false);
  };

  const refreshKeywords = async () => {
    setIsKeywordsLoading(true);
    await new Promise(r => setTimeout(r, 300));
    setTrendKeywords(DEFAULT_KEYWORDS.sort(() => Math.random() - 0.5).slice(0, 8));
    setIsKeywordsLoading(false);
  };

  // Calculate sentiment data
  const sentimentData: SentimentData = {
    positive: newsItems.filter(i => i.sentiment_label === 'positive').length,
    neutral: newsItems.filter(i => i.sentiment_label === 'neutral').length,
    negative: newsItems.filter(i => i.sentiment_label === 'negative').length,
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
      {/* Header */}
      <Header 
        onProfileClick={() => setIsProfileModalOpen(true)}
        onSettingsClick={() => setIsProfileModalOpen(true)}
      />

      {/* Search Area */}
      <SearchArea 
        onSearch={handleSearch}
        isLoading={searchMutation.isPending}
      />

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="container max-w-screen-xl px-4 md:px-8">
          {isInitialLoading ? (
            <div className="text-center py-20 text-muted-foreground">
              <div className="inline-block w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
              <p>뉴스를 불러오는 중...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 text-destructive bg-destructive/10 rounded-xl">
              <p className="font-semibold">뉴스 로딩 실패</p>
              <p className="text-sm mt-2">
                {(error as any)?.message || '알 수 없는 오류'}
              </p>
            </div>
          ) : (
            /* 2-Column Layout: Left = Sidebar, Right = Results */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Recommend Section */}
              <aside className="lg:col-span-1 order-first lg:order-first">
                <div className="lg:sticky lg:top-24 space-y-0">
                  {/* Profile Panel */}
                  <ProfilePanel 
                    profile={profile}
                    onEditClick={() => setIsProfileModalOpen(true)}
                  />

                  {/* Today's News */}
                  <TodayNewsPanel
                    items={todayNews}
                    onItemClick={handleTodayNewsClick}
                    onRefresh={refreshTodayNews}
                    isLoading={isTodayNewsLoading}
                  />

                  {/* Trend Keywords */}
                  <TrendKeywordsPanel
                    keywords={trendKeywords}
                    onKeywordClick={handleKeywordClick}
                    onRefresh={refreshKeywords}
                    isLoading={isKeywordsLoading}
                  />

                  {/* Sentiment Analysis */}
                  <SentimentPanel
                    data={sentimentData}
                    total={newsItems.length}
                  />
                </div>
              </aside>

              {/* Right Column: Search Results */}
              <section className="lg:col-span-2">
                <NewsGrid
                  items={newsItems}
                  onAnalyze={handleAnalyze}
                  onBookmark={handleBookmark}
                  onShare={handleShare}
                  analyzingId={analyzingId}
                  bookmarkedIds={bookmarkedIds}
                  resultCount={newsItems.length}
                />
              </section>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        apiKeys={apiKeys}
        onSave={saveProfile}
        onSaveApiKeys={saveApiKeys}
      />
    </div>
  );
}
