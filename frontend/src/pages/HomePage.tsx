import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SearchArea } from '@/components/features/SearchArea';
import { RecommendationColumn } from '@/components/features/RecommendationColumn';
import { ResultColumn } from '@/components/features/ResultColumn';

export const HomePage: React.FC = () => {
  return (
    <MainLayout>
      {/* 1. Search Area (Full Width) */}
      <SearchArea />
      
      {/* 2. Content Area (2 Columns) */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: Recommendations */}
        <RecommendationColumn />
        
        {/* Right: Search Results */}
        <ResultColumn />
      </div>
    </MainLayout>
  );
};
