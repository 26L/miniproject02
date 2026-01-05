import { PieChart } from 'lucide-react';

interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
}

interface SentimentPanelProps {
  data: SentimentData;
  total: number;
}

export function SentimentPanel({ data, total }: SentimentPanelProps) {
  const percentages = {
    positive: total > 0 ? Math.round((data.positive / total) * 100) : 0,
    neutral: total > 0 ? Math.round((data.neutral / total) * 100) : 0,
    negative: total > 0 ? Math.round((data.negative / total) * 100) : 0,
  };

  // Calculate angles for donut chart
  const getStrokeDasharray = (percent: number) => {
    const circumference = 2 * Math.PI * 45; // radius = 45
    return `${(percent / 100) * circumference} ${circumference}`;
  };

  const getStrokeDashoffset = (startPercent: number) => {
    const circumference = 2 * Math.PI * 45;
    return -((startPercent / 100) * circumference);
  };

  return (
    <section className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
      {/* Panel Header */}
      <div className="px-5 py-4 border-b border-border bg-gradient-to-r from-primary/5 to-[#023E8A]/5">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <PieChart className="h-5 w-5 text-primary" />
          감정 분석
        </h3>
      </div>

      {/* Panel Content */}
      <div className="p-5">
        {/* Donut Chart */}
        <div className="flex justify-center mb-6">
          <svg width="150" height="150" viewBox="0 0 100 100" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="10"
            />
            
            {/* Positive segment */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#10B981"
              strokeWidth="10"
              strokeDasharray={getStrokeDasharray(percentages.positive)}
              strokeDashoffset={getStrokeDashoffset(0)}
              className="transition-all duration-500"
            />
            
            {/* Neutral segment */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="10"
              strokeDasharray={getStrokeDasharray(percentages.neutral)}
              strokeDashoffset={getStrokeDashoffset(percentages.positive)}
              className="transition-all duration-500"
            />
            
            {/* Negative segment */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#EF4444"
              strokeWidth="10"
              strokeDasharray={getStrokeDasharray(percentages.negative)}
              strokeDashoffset={getStrokeDashoffset(percentages.positive + percentages.neutral)}
              className="transition-all duration-500"
            />
          </svg>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mb-6 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#10B981]"></span>
            <span>긍정</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]"></span>
            <span>중립</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]"></span>
            <span>부정</span>
          </div>
        </div>

        {/* Bar Charts */}
        <div className="space-y-3.5">
          {/* Positive */}
          <div className="flex items-center gap-3">
            <span className="min-w-[48px] text-sm font-medium text-muted-foreground">긍정</span>
            <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full sentiment-bar-positive transition-all duration-500"
                style={{ width: `${percentages.positive}%` }}
              />
            </div>
            <span className="min-w-[32px] text-right text-sm font-semibold text-muted-foreground">
              {data.positive}
            </span>
          </div>

          {/* Neutral */}
          <div className="flex items-center gap-3">
            <span className="min-w-[48px] text-sm font-medium text-muted-foreground">중립</span>
            <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full sentiment-bar-neutral transition-all duration-500"
                style={{ width: `${percentages.neutral}%` }}
              />
            </div>
            <span className="min-w-[32px] text-right text-sm font-semibold text-muted-foreground">
              {data.neutral}
            </span>
          </div>

          {/* Negative */}
          <div className="flex items-center gap-3">
            <span className="min-w-[48px] text-sm font-medium text-muted-foreground">부정</span>
            <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full sentiment-bar-negative transition-all duration-500"
                style={{ width: `${percentages.negative}%` }}
              />
            </div>
            <span className="min-w-[32px] text-right text-sm font-semibold text-muted-foreground">
              {data.negative}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export type { SentimentData };
