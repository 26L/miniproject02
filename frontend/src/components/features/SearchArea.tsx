import React from 'react';

export const SearchArea: React.FC = () => {
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
            className="w-full h-14 pl-6 pr-32 rounded-ui border-2 border-gray-100 bg-white text-lg focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm"
          />
          <button className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-secondary text-white px-6 rounded-lg font-medium transition-all">
            검색하기
          </button>
        </div>
      </div>
    </section>
  );
};
