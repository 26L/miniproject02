import type { NewsItem } from '@/types';
import { NewsCard } from './NewsCard';
import { Search, Database, Cloud } from 'lucide-react';
import { hasValidApiKeys } from '@/services/api';

interface NewsGridProps {
  items: NewsItem[];
  onAnalyze: (id: number) => void;
  onBookmark: (id: number) => void;
  onShare: (id: number) => void;
  analyzingId: number | null;
  bookmarkedIds: number[];
  resultCount: number;
}

export function NewsGrid({ 
  items, 
  onAnalyze, 
  onBookmark, 
  onShare, 
  analyzingId, 
  bookmarkedIds,
  resultCount 
}: NewsGridProps) {
  const isUsingRealApi = hasValidApiKeys();
  
  return (
    <section className="bg-white rounded-xl shadow-md overflow-hidden" aria-label="검색 결과">
      {/* Column Header */}
      <div className="px-5 py-4 border-b border-border flex justify-between items-center bg-gradient-to-r from-primary/5 to-[#023E8A]/5">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          검색 결과
        </h2>
        <div className="flex items-center gap-4">
          {/* API 모드 표시 */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
            isUsingRealApi 
              ? 'bg-green-100 text-green-700' 
              : 'bg-amber-100 text-amber-700'
          }`}>
            {isUsingRealApi ? (
              <>
                <Cloud className="h-3.5 w-3.5" />
                <span>실시간 API</span>
              </>
            ) : (
              <>
                <Database className="h-3.5 w-3.5" />
                <span>데모 모드</span>
              </>
            )}
          </div>
          <div className="text-muted-foreground text-sm">
            <strong className="text-primary font-semibold">{resultCount}</strong>개의 결과
          </div>
        </div>
      </div>

      {/* News Feed */}
      <div className="min-h-[400px] max-h-[75vh] overflow-y-auto scrollbar-thin">
        {items.length === 0 ? (
          <div className="text-center py-16 px-8">
            <Search className="h-16 w-16 mx-auto text-primary/40 mb-4" />
            <p className="text-base text-muted-foreground leading-relaxed">
              검색어를 입력하여 뉴스를 찾아보세요
            </p>
          </div>
        ) : (
          <div className="animate-fade-in">
            {items.map((item) => (
              <NewsCard 
                key={item.id} 
                news={item} 
                onAnalyze={onAnalyze}
                onBookmark={onBookmark}
                onShare={onShare}
                isAnalyzing={analyzingId === item.id}
                isBookmarked={bookmarkedIds.includes(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
