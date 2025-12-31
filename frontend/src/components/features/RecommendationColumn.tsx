import React from 'react';

// Placeholder Mock Data
const MOCK_RECOMMENDATIONS = [
  { id: 1, title: "2025 글로벌 테크 서밋 주요 하이라이트", category: "기술" },
  { id: 2, title: "시장 트렌드: 전기차 판매 급증", category: "경제" },
  { id: 3, title: "새로운 AI 규제 법안 제안", category: "정책" },
  { id: 4, title: "스페이스X 스타쉽 발사 성공", category: "과학" },
  { id: 5, title: "기후 변화 정상회의 결과 분석", category: "환경" },
];

export const RecommendationColumn: React.FC = () => {
  return (
    <aside className="hidden lg:block w-80 shrink-0">
      <div className="sticky top-8 space-y-8">
        
        {/* Today's Top News */}
        <div className="bg-white p-6 rounded-ui shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
            🔥 지금 뜨는 뉴스
          </h3>
          <ul className="space-y-4">
            {MOCK_RECOMMENDATIONS.map((item) => (
              <li key={item.id} className="group cursor-pointer">
                <div className="text-xs text-primary font-semibold mb-1">{item.category}</div>
                <div className="text-sm text-gray-700 font-medium group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </div>
              </li>
            ))}
          </ul>
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
