import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchAreaProps {
  onSearch: (query: string, category: string, dateRange: string) => void;
  isLoading: boolean;
}

const CATEGORIES = [
  { value: '', label: '모든 카테고리' },
  { value: 'politics', label: '정치' },
  { value: 'economy', label: '경제' },
  { value: 'society', label: '사회' },
  { value: 'technology', label: '기술' },
  { value: 'sports', label: '스포츠' },
];

const DATE_RANGES = [
  { value: 'today', label: '오늘' },
  { value: 'week', label: '이번 주' },
  { value: 'month', label: '이번 달' },
  { value: 'year', label: '올해' },
];

export function SearchArea({ onSearch, isLoading }: SearchAreaProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [dateRange, setDateRange] = useState('today');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, category, dateRange);
  };

  return (
    <section className="bg-white border-b border-border py-8" aria-label="뉴스 검색">
      <div className="container max-w-screen-xl px-4 md:px-8">
        <form onSubmit={handleSubmit}>
          {/* Search Box */}
          <div className="flex flex-col sm:flex-row gap-4 mb-5">
            <div className="relative flex-1">
              <input
                type="text"
                id="searchInput"
                placeholder="키워드 또는 문장을 입력해 검색해 보세요..."
                aria-label="검색어 입력"
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-3 pr-4 border-2 border-border rounded-xl text-base transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="gradient-primary text-white px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:translate-y-[-2px] hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto w-full"
            >
              {isLoading ? (
                <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Search className="h-5 w-5" />
              )}
              <span>검색</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              id="categoryFilter"
              aria-label="카테고리 선택"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 border-2 border-border rounded-lg bg-white text-sm cursor-pointer transition-all hover:border-primary/50 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 min-w-[140px]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>

            <select
              id="dateFilter"
              aria-label="기간 선택"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-3 border-2 border-border rounded-lg bg-white text-sm cursor-pointer transition-all hover:border-primary/50 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 min-w-[140px]"
            >
              {DATE_RANGES.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </section>
  );
}
