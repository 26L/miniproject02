import { Flame, RefreshCw } from 'lucide-react';

interface TodayNewsItem {
  id: number;
  title: string;
  source: string;
  date: string;
}

interface TodayNewsPanelProps {
  items: TodayNewsItem[];
  onItemClick: (title: string) => void;
  onRefresh: () => void;
  isLoading?: boolean;
}

export function TodayNewsPanel({ items, onItemClick, onRefresh, isLoading }: TodayNewsPanelProps) {
  return (
    <section className="bg-white rounded-xl shadow-md mb-6 overflow-hidden transition-all hover:shadow-lg">
      {/* Panel Header */}
      <div className="px-5 py-4 border-b border-border flex justify-between items-center bg-gradient-to-r from-primary/5 to-[#023E8A]/5">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Flame className="h-5 w-5 text-primary" />
          오늘의 주요 뉴스
        </h3>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-2 text-primary hover:bg-primary/10 rounded-md transition-all hover:rotate-180 disabled:opacity-50"
          aria-label="새로고침"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Panel Content */}
      <div className="p-4">
        <ul className="max-h-[400px] overflow-y-auto scrollbar-thin space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              onClick={() => onItemClick(item.title)}
              className="p-3 rounded-lg cursor-pointer transition-all border border-transparent hover:bg-background hover:border-border"
            >
              <div className="text-sm font-medium text-foreground mb-1 line-clamp-2 leading-relaxed">
                {item.title}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="text-primary font-medium">{item.source}</span>
                <span>{item.date}</span>
              </div>
            </li>
          ))}
          {items.length === 0 && (
            <li className="text-center text-muted-foreground py-8">
              표시할 뉴스가 없습니다
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}

export type { TodayNewsItem };
