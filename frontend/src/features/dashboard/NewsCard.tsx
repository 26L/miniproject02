import type { NewsItem } from '@/types';
import { ExternalLink, Bookmark, Share2, Smile, Meh, Frown, Bot } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
  onAnalyze: (id: number) => void;
  onBookmark: (id: number) => void;
  onShare: (id: number) => void;
  isAnalyzing: boolean;
  isBookmarked?: boolean;
}

const CATEGORY_NAMES: Record<string, string> = {
  politics: '정치',
  economy: '경제',
  society: '사회',
  technology: '기술',
  sports: '스포츠',
  general: '일반',
};

export function NewsCard({ 
  news, 
  onAnalyze, 
  onBookmark, 
  onShare, 
  isAnalyzing, 
  isBookmarked = false 
}: NewsCardProps) {
  
  // Format date relative to now
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return '오늘';
    if (diffDays === 1) return '어제';
    if (diffDays < 7) return `${diffDays}일 전`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
    
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get sentiment display info
  const getSentimentInfo = (label: string | null) => {
    switch (label) {
      case 'positive':
        return { 
          icon: <Smile className="h-3.5 w-3.5" />, 
          text: '긍정', 
          className: 'bg-green-100 text-green-700' 
        };
      case 'negative':
        return { 
          icon: <Frown className="h-3.5 w-3.5" />, 
          text: '부정', 
          className: 'bg-red-100 text-red-700' 
        };
      case 'neutral':
        return { 
          icon: <Meh className="h-3.5 w-3.5" />, 
          text: '중립', 
          className: 'bg-amber-100 text-amber-700' 
        };
      default:
        return null;
    }
  };

  const sentimentInfo = getSentimentInfo(news.sentiment_label);
  const category = (news as any).category || 'general';

  return (
    <article className="p-5 border-b border-border transition-colors hover:bg-background cursor-pointer focus-within:outline focus-within:outline-2 focus-within:outline-primary focus-within:outline-offset-[-2px]">
      {/* Header: Meta Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Badge */}
          <span className="gradient-primary text-white px-3 py-1 rounded-full text-xs font-medium">
            {CATEGORY_NAMES[category] || '일반'}
          </span>
          
          {/* Date */}
          <span className="text-xs text-muted-foreground">
            {formatDate(news.published_at)}
          </span>
          
          {/* Sentiment */}
          {sentimentInfo && (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${sentimentInfo.className}`}>
              {sentimentInfo.icon}
              {sentimentInfo.text}
            </span>
          )}
        </div>
        
        {/* Source */}
        <span className="text-xs text-muted-foreground font-medium">
          {(news as any).source || '출처 미상'}
        </span>
      </div>

      {/* Content: Title & Summary */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2 leading-relaxed transition-colors hover:text-primary line-clamp-2">
          {news.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {news.summary || news.content || '내용이 없습니다.'}
        </p>
      </div>

      {/* Footer: Actions */}
      <div className="flex items-center justify-between">
        <a
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary text-sm font-medium inline-flex items-center gap-1.5 hover:text-primary/80 transition-all hover:gap-2"
        >
          기사 읽기
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
        
        <div className="flex items-center gap-1">
          {/* AI Analysis Button */}
          {!news.summary && (
            <button
              onClick={() => onAnalyze(news.id)}
              disabled={isAnalyzing}
              className="p-2 rounded-md text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-50"
              aria-label="AI 분석"
              title="AI 분석"
            >
              {isAnalyzing ? (
                <span className="inline-block w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
              ) : (
                <Bot className="h-4 w-4" />
              )}
            </button>
          )}
          
          {/* Bookmark Button */}
          <button
            onClick={() => onBookmark(news.id)}
            className={`p-2 rounded-md transition-all ${
              isBookmarked 
                ? 'text-primary bg-primary/10' 
                : 'text-muted-foreground hover:bg-primary/10 hover:text-primary'
            }`}
            aria-label={isBookmarked ? '북마크 제거' : '북마크 추가'}
            title="북마크"
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
          
          {/* Share Button */}
          <button
            onClick={() => onShare(news.id)}
            className="p-2 rounded-md text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all"
            aria-label="공유"
            title="공유"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
