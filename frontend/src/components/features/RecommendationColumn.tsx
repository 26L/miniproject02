import React from 'react';
import { useTrendingNews } from '../../hooks/useNewsQueries';

export const RecommendationColumn: React.FC = () => {
  const { data: trendingNews, isLoading } = useTrendingNews();

  return (
    <aside className="hidden lg:block w-80 shrink-0">
      <div className="sticky top-8 space-y-8">
        
        {/* Today's Top News */}
        <div className="bg-white p-6 rounded-ui shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
            🔥 최신 뉴스
          </h3>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-4">
              {trendingNews && trendingNews.length > 0 ? (
                trendingNews.map((item) => (
                  <li key={item.id} className="group cursor-pointer">
                     <div className="text-xs text-primary font-semibold mb-1">
                      {item.url ? new URL(item.url).hostname.replace('www.', '') : 'News'}
                    </div>
                    <div className="text-sm text-gray-700 font-medium group-hover:text-primary transition-colors line-clamp-2">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-400">추천 뉴스가 없습니다.</li>
              )}
            </ul>
          )}
        </div>

        {/* User Interest */}
        <div className="bg-white p-6 rounded-ui shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-text mb-4">
            추천 뉴스
          </h3>
          <p className="text-sm text-gray-400">
            로그인하시면 독자님의 읽기 이력을 바탕으로 맞춤형 뉴스를 추천해 드립니다.
          </p>
        </div>

      </div>
    </aside>
  );
};
