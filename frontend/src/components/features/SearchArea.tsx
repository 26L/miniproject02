import React, { useState } from 'react';
import { useSearchNews } from '../../hooks/useNewsQueries';

export const SearchArea: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const searchMutation = useSearchNews();

  const handleSearch = () => {
    if (!keyword.trim()) return;
    searchMutation.mutate(keyword);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="w-full mb-10 text-center">
      <h2 className="text-3xl font-bold text-text mb-4">
        AI 인사이트로 <span className="text-primary">뉴스를 발견해 보세요</span>
      </h2>
      <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
        실시간 뉴스 요약과 인공지능 감성 분석 결과를 한눈에 확인하실 수 있습니다.
      </p>
      
      <div className="relative max-w-3xl mx-auto">
        <div className="relative flex items-center">
          <input 
            type="text" 
            placeholder="키워드를 입력해 주세요 (예: 테슬라, 기후 변화)..." 
            className="w-full h-14 pl-6 pr-32 rounded-ui border-2 border-gray-100 bg-white text-lg focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm disabled:bg-gray-50 disabled:text-gray-400"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={searchMutation.isPending}
          />
          <button 
            onClick={handleSearch}
            disabled={searchMutation.isPending}
            className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-secondary text-white px-6 rounded-lg font-medium transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {searchMutation.isPending ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>검색 중</span>
              </>
            ) : (
              '검색하기'
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
