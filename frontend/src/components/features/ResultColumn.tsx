import React from 'react';

// Placeholder Mock Data for Results
const MOCK_RESULTS = [
  { 
    id: 1, 
    title: "엔비디아, 차세대 GPU 아키텍처 발표", 
    summary: "엔비디아가 AI 작업 성능을 2배 향상시킨 최신 GPU 아키텍처를 공개했습니다. 전문가들은 데이터 센터 시장에 큰 영향을 미칠 것으로 예측하고 있습니다.",
    sentiment: "positive",
    source: "테크크런치",
    date: "2025-12-30"
  },
  { 
    id: 2, 
    title: "4분기 금리 동결 결정", 
    summary: "연방준비제도는 안정적인 인플레이션 데이터를 근거로 금리를 유지하기로 했습니다. 시장은 완만한 낙관론으로 반응했습니다.",
    sentiment: "neutral",
    source: "블룸버그",
    date: "2025-12-29"
  },
  { 
    id: 3, 
    title: "대규모 사이버 보안 침해 사고 발생", 
    summary: "주요 소매 은행에서 사용자 정보가 유출되는 대규모 데이터 침해 사고가 보고되었습니다. 전문가들은 신원 도용 위험을 경고하고 있습니다.",
    sentiment: "negative",
    source: "BBC 뉴스",
    date: "2025-12-28"
  },
  { 
    id: 4, 
    title: "전기차 판매량 역대 최고치 기록", 
    summary: "이번 분기 글로벌 전기차 판매량이 보조금 확대와 배터리 기술 향상에 힘입어 역대 최고치를 경신했습니다.",
    sentiment: "positive",
    source: "로이터",
    date: "2025-12-31"
  },
];

const SentimentBadge: React.FC<{ type: string }> = ({ type }) => {
  const styles = {
    positive: "bg-green-100 text-green-700 border-green-200",
    neutral: "bg-yellow-100 text-yellow-700 border-yellow-200",
    negative: "bg-red-100 text-red-700 border-red-200",
  };
  
  const labels = {
    positive: "긍정 😊",
    neutral: "중립 😐",
    negative: "부정 😟",
  };

  const styleClass = styles[type as keyof typeof styles] || styles.neutral;
  const label = labels[type as keyof typeof styles] || labels.neutral;

  return (
    <span className={`text-xs px-2 py-1 rounded border font-medium ${styleClass}`}>
      {label}
    </span>
  );
};

export const ResultColumn: React.FC = () => {
  return (
    <section className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-text">최신 분석 결과</h3>
        <span className="text-sm text-gray-400">{MOCK_RESULTS.length}개의 결과</span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {MOCK_RESULTS.map((news) => (
          <article 
            key={news.id} 
            className="bg-white p-6 rounded-ui shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-transparent hover:border-primary/10"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="font-semibold text-primary">{news.source}</span>
                <span>•</span>
                <span>{news.date}</span>
              </div>
              <SentimentBadge type={news.sentiment} />
            </div>
            
            <h4 className="text-xl font-bold text-text mb-3 leading-tight group-hover:text-primary">
              {news.title}
            </h4>
            
            <p className="text-gray-600 leading-relaxed mb-4">
              {news.summary}
            </p>

            <button className="text-sm font-semibold text-secondary hover:text-primary transition-colors flex items-center gap-1">
              상세 분석 보기 →
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};
