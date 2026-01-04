import { TrendingUp, RefreshCw } from 'lucide-react';

interface TrendKeywordsPanelProps {
  keywords: string[];
  onKeywordClick: (keyword: string) => void;
  onRefresh: () => void;
  isLoading?: boolean;
}

export function TrendKeywordsPanel({ keywords, onKeywordClick, onRefresh, isLoading }: TrendKeywordsPanelProps) {
  return (
    <section className="bg-white rounded-xl shadow-md mb-6 overflow-hidden transition-all hover:shadow-lg">
      {/* Panel Header */}
      <div className="px-5 py-4 border-b border-border flex justify-between items-center bg-gradient-to-r from-primary/5 to-[#023E8A]/5">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          인기 키워드
        </h3>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-2 text-primary hover:bg-primary/10 rounded-md transition-all hover:rotate-180 disabled:opacity-50"
          aria-label="키워드 새로고침"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Panel Content */}
      <div className="p-5">
        <div className="flex flex-wrap gap-2.5" role="list">
          {keywords.map((keyword, index) => (
            <button
              key={`${keyword}-${index}`}
              onClick={() => onKeywordClick(keyword)}
              className="gradient-primary text-white px-4 py-2 rounded-full text-xs font-medium cursor-pointer transition-all hover:translate-y-[-2px] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
              role="listitem"
            >
              {keyword}
            </button>
          ))}
          {keywords.length === 0 && (
            <span className="text-muted-foreground text-sm">
              {isLoading ? '로딩 중...' : '키워드 없음'}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
