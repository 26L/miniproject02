import type { NewsItem } from '@/types';
import { Button } from '@/components/ui/button';
import { ExternalLink, Bot } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
  onAnalyze: (id: number) => void;
  isAnalyzing: boolean;
}

export function NewsCard({ news, onAnalyze, isAnalyzing }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getSentimentColor = (label: string | null) => {
    switch (label) {
      case 'positive': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'negative': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'neutral': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-muted-foreground">{formatDate(news.published_at)}</span>
          {news.sentiment_label && (
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${getSentimentColor(news.sentiment_label)}`}>
              {news.sentiment_label.toUpperCase()}
            </span>
          )}
        </div>
        <h3 className="font-semibold leading-none tracking-tight mb-2 line-clamp-2">
          {news.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {news.summary || news.content || "No content available."}
        </p>
        
        {news.keywords && news.keywords.length > 0 && (
           <div className="flex flex-wrap gap-1 mb-4">
             {news.keywords.slice(0, 3).map((k: string, i: number) => (
               <span key={i} className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold text-foreground">
                 #{k}
               </span>
             ))}
           </div>
        )}
      </div>

      <div className="flex items-center p-6 pt-0 gap-2 mt-auto">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 gap-1.5 px-2 text-xs"
          onClick={() => window.open(news.url, '_blank')}
        >
          <ExternalLink className="h-3.5 w-3.5" />
          원문 읽기
        </Button>
        {!news.summary && (
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1 gap-1.5 px-2 text-xs"
            onClick={() => onAnalyze(news.id)}
            isLoading={isAnalyzing}
          >
            <Bot className="h-3.5 w-3.5" />
            AI 분석
          </Button>
        )}
      </div>
    </div>
  );
}
