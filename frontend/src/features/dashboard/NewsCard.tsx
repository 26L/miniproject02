import type { NewsItem } from '@/types';
import { Button } from '@/components/ui/button';
import { ExternalLink, Bot } from 'lucide-react';

/**
 * NewsCard 컴포넌트의 입력값(Props) 정의
 * news: 표시할 뉴스 데이터 객체
 * onAnalyze: 부모로부터 전달받은 분석 실행 함수
 * isAnalyzing: 현재 이 카드가 분석 중인지 여부 (로딩 표시용)
 */
interface NewsCardProps {
  news: NewsItem;
  onAnalyze: (id: number) => void;
  isAnalyzing: boolean;
}

/**
 * 개별 뉴스를 카드 형태로 보여주는 UI 컴포넌트입니다.
 */
export function NewsCard({ news, onAnalyze, isAnalyzing }: NewsCardProps) {
  
  // 날짜를 "2026년 1월 2일" 형식으로 변환하는 보조 함수
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // 감성(Sentiment) 라벨에 따라 다른 색상을 반환하는 함수
  const getSentimentColor = (label: string | null) => {
    switch (label) {
      case 'positive': return 'bg-green-100 text-green-800'; // 긍정: 초록색
      case 'negative': return 'bg-red-100 text-red-800';     // 부정: 빨간색
      case 'neutral': return 'bg-gray-100 text-gray-800';   // 중립: 회색
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    /**
     * Tailwind CSS 클래스 설명:
     * flex-col: 자식 요소들을 세로로 배치
     * rounded-xl: 모서리를 크게 둥글게
     * border: 테두리 추가
     * hover:shadow-md: 마우스를 올렸을 때 그림자 효과
     */
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
      <div className="p-6">
        {/* 상단: 날짜 및 감성 라벨 */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-muted-foreground">{formatDate(news.published_at)}</span>
          {news.sentiment_label && (
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getSentimentColor(news.sentiment_label)}`}>
              {news.sentiment_label.toUpperCase()}
            </span>
          )}
        </div>

        {/* 중앙: 제목 및 요약/본문 */}
        <h3 className="font-semibold leading-none tracking-tight mb-2 line-clamp-2">
          {news.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {news.summary || news.content || "내용이 없습니다."}
        </p>
        
        {/* 키워드 태그 목록 */}
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

      {/* 하단: 액션 버튼 영역 */}
      <div className="flex items-center p-6 pt-0 gap-2 mt-auto">
        {/* 원문 읽기: 외부 브라우저 창으로 연결 */}
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 gap-1.5 px-2 text-xs"
          onClick={() => window.open(news.url, '_blank')}
        >
          <ExternalLink className="h-3.5 w-3.5" />
          원문 읽기
        </Button>

        {/* AI 분석: 요약 데이터가 없을 때만 보여줍니다. */}
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
