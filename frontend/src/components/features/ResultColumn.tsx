import React from 'react';
import { useNewsList, useAnalyzeNews } from '../../hooks/useNewsQueries';
import { NewsItem } from '../../types';

const SentimentBadge: React.FC<{ label: string | null }> = ({ label }) => {
  const styles: Record<string, string> = {
    positive: "bg-green-100 text-green-700 border-green-200",
    neutral: "bg-yellow-100 text-yellow-700 border-yellow-200",
    negative: "bg-red-100 text-red-700 border-red-200",
    default: "bg-gray-100 text-gray-600 border-gray-200"
  };
  
  const labels: Record<string, string> = {
    positive: "긍정 😊",
    neutral: "중립 😐",
    negative: "부정 😟",
    default: "분석 전"
  };

  // Backend returns lowercase, but let's be safe
  const key = label?.toLowerCase() || 'default';
  const styleClass = styles[key] || styles.default;
  const text = labels[key] || labels.default;

  return (
    <span className={`text-xs px-2 py-1 rounded border font-medium ${styleClass}`}>
      {text}
    </span>
  );
};

const NewsCard: React.FC<{ news: NewsItem }> = ({ news }) => {
  const analyzeMutation = useAnalyzeNews();

  const handleAnalyze = () => {
    analyzeMutation.mutate(news.id);
  };

  return (
    <article 
      className="bg-white p-6 rounded-ui shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-transparent hover:border-primary/10"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span className="font-semibold text-primary overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]">
            {news.url ? new URL(news.url).hostname.replace('www.', '') : 'News Source'}
          </span>
          <span>•</span>
          <span>{news.published_at ? new Date(news.published_at).toLocaleDateString() : '날짜 미상'}</span>
        </div>
        <SentimentBadge label={news.sentiment_label} />
      </div>
      
      <h4 className="text-xl font-bold text-text mb-3 leading-tight group-hover:text-primary">
        <a href={news.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {news.title}
        </a>
      </h4>
      
      <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
        {news.summary || news.content || "요약 정보가 없습니다."}
      </p>

      {/* Keywords Display if analyzed */}
      {news.keywords && news.keywords.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {news.keywords.map((k, idx) => (
            <span key={idx} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
              #{k}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        {!news.summary ? (
          <button 
            onClick={handleAnalyze}
            disabled={analyzeMutation.isPending}
            className="text-sm font-semibold text-secondary hover:text-primary transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-wait"
          >
            {analyzeMutation.isPending ? '분석 중...' : 'AI 분석 실행 →'}
          </button>
        ) : (
           <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
             ✓ 분석 완료
           </span>
        )}
      </div>
    </article>
  );
};

export const ResultColumn: React.FC = () => {
  const { data: newsList, isLoading, isError } = useNewsList();

  if (isLoading) {
    return (
      <section className="flex-1 min-w-0">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-ui"></div>
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="flex-1 min-w-0 text-center py-10">
        <p className="text-red-500 font-medium">뉴스를 불러오는 데 실패했습니다.</p>
        <p className="text-sm text-gray-400 mt-2">잠시 후 다시 시도해 주세요.</p>
      </section>
    );
  }

  return (
    <section className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-text">최신 분석 결과</h3>
        <span className="text-sm text-gray-400">{newsList?.length || 0}개의 결과</span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {newsList && newsList.length > 0 ? (
          newsList.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-ui border border-gray-100">
            <p className="text-gray-500">아직 저장된 뉴스가 없습니다.</p>
            <p className="text-sm text-gray-400 mt-1">위 검색창을 통해 관심 있는 뉴스를 찾아보세요!</p>
          </div>
        )}
      </div>
    </section>
  );
};
