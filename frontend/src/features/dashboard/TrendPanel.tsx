import type { NewsItem } from '@/types';

interface TrendPanelProps {
  items: NewsItem[];
}

export function TrendPanel({ items }: TrendPanelProps) {
  // Simple keyword frequency calculation
  const allKeywords = items.flatMap(item => item.keywords || []);
  const frequency: Record<string, number> = {};
  
  allKeywords.forEach(k => {
    frequency[k] = (frequency[k] || 0) + 1;
  });

  const topKeywords = Object.entries(frequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  return (
    <div className="bg-card text-card-foreground rounded-xl border p-6 space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-2">인기 키워드</h3>
        <div className="flex flex-wrap gap-2">
          {topKeywords.map(([word, count]) => (
            <span key={word} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm">
              {word} <span className="text-xs text-muted-foreground ml-1">{count}</span>
            </span>
          ))}
          {topKeywords.length === 0 && <span className="text-muted-foreground text-sm">데이터 없음</span>}
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold text-lg mb-2">시장 감정 분포</h3>
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span>긍정</span>
                <span className="text-green-600 font-bold">{items.filter(i => i.sentiment_label === 'positive').length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
                <span>부정</span>
                <span className="text-red-600 font-bold">{items.filter(i => i.sentiment_label === 'negative').length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
                <span>중립</span>
                <span className="text-gray-600 font-bold">{items.filter(i => i.sentiment_label === 'neutral').length}</span>
            </div>
        </div>
      </div>
    </div>
  );
}
