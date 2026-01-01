import type { NewsItem } from '@/types';
import { NewsCard } from './NewsCard';

interface NewsGridProps {
  items: NewsItem[];
  onAnalyze: (id: number) => void;
  analyzingId: number | null;
}

export function NewsGrid({ items, onAnalyze, analyzingId }: NewsGridProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-in fade-in duration-700">
      {items.map((item) => (
        <NewsCard 
          key={item.id} 
          news={item} 
          onAnalyze={onAnalyze}
          isAnalyzing={analyzingId === item.id}
        />
      ))}
    </div>
  );
}
