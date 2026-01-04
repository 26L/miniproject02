import type { NewsItem } from '@/types';

// Extended NewsItem with source and category
interface ExtendedNewsItem extends NewsItem {
  source?: string;
  category?: string;
}

export const DUMMY_NEWS: ExtendedNewsItem[] = [
  {
    id: 1,
    title: "2024년 경제 전망, 전문가들의 분석 - 금리 인하 시점과 성장 동력",
    url: "https://example.com/markets-rally",
    content: "국내외 경제 전문가들은 2024년 하반기부터 점진적인 경기 회복이 시작될 것으로 전망했습니다. 특히 반도체 산업과 전기차 분야에서의 성장이 기대됩니다...",
    image_url: "https://placehold.co/600x400",
    summary: "전문가들은 2024년 하반기부터 점진적인 경기 회복을 예상하며, 반도체와 전기차 산업이 성장을 주도할 것으로 분석했습니다.",
    sentiment_label: "positive",
    sentiment_score: 0.85,
    keywords: ["경제", "금리", "반도체", "전기차"],
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    created_at: new Date().toISOString(),
    source: "매일경제",
    category: "economy"
  },
  {
    id: 2,
    title: "AI 기술 발전이 일상에 미치는 영향 - 생성형 AI 활용 사례 분석",
    url: "https://example.com/ai-medical-breakthrough",
    content: "인공지능 기술의 빠른 발전으로 의료, 교육, 금융 등 다양한 분야에서 혁신이 일어나고 있습니다. 특히 생성형 AI의 등장으로 업무 효율성이 크게 향상되고 있습니다...",
    image_url: null,
    summary: "AI 기술은 의료 진단, 교육 커리큘럼 개인화, 금융 서비스 자동화 등 다양한 분야에서 혁신을 주도하고 있습니다.",
    sentiment_label: "positive",
    sentiment_score: 0.92,
    keywords: ["AI", "인공지능", "기술", "혁신"],
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    created_at: new Date().toISOString(),
    source: "IT동아",
    category: "technology"
  },
  {
    id: 3,
    title: "글로벌 기후 변화 대응 정책 논의 - 탄소중립 달성을 위한 국제 협력",
    url: "https://example.com/traffic-chaos",
    content: "주요 국가들이 탄소중립 목표 달성을 위한 구체적인 실행 계획을 발표했습니다. 환경 전문가들은 더욱 적극적인 대응이 필요하다고 주장하고 있습니다...",
    image_url: "https://placehold.co/600x400/red/white",
    summary: null,
    sentiment_label: "neutral",
    sentiment_score: 0.05,
    keywords: ["기후변화", "탄소중립", "환경", "국제협력"],
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    created_at: new Date().toISOString(),
    source: "한국일보",
    category: "society"
  },
  {
    id: 4,
    title: "국내 스타트업 투자 동향 분석 - 시리즈 A 투자 규모 급감",
    url: "https://example.com/earnings-report",
    content: "올해 국내 스타트업 투자 시장은 작년 대비 크게 위축되었습니다. 특히 초기 단계 투자가 급감하면서 창업 생태계에 대한 우려가 커지고 있습니다...",
    image_url: null,
    summary: "2024년 국내 스타트업 투자 규모가 전년 대비 40% 감소했으며, 특히 시리즈 A 단계 투자가 크게 위축되었습니다.",
    sentiment_label: "negative",
    sentiment_score: -0.65,
    keywords: ["스타트업", "투자", "벤처캐피탈", "창업"],
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    created_at: new Date().toISOString(),
    source: "조선비즈",
    category: "economy"
  },
  {
    id: 5,
    title: "헬스케어 산업의 디지털 전환 가속화 - 원격 의료 확대",
    url: "https://example.com/garden-award",
    content: "코로나19 이후 원격 의료 서비스가 급격히 성장했습니다. 정부는 원격 의료 관련 규제를 완화하고 관련 산업 육성에 나설 계획입니다...",
    image_url: "https://placehold.co/600x400/green/white",
    summary: "원격 의료 시장이 빠르게 성장하고 있으며, 정부의 규제 완화로 디지털 헬스케어 산업이 더욱 활성화될 전망입니다.",
    sentiment_label: "positive",
    sentiment_score: 0.78,
    keywords: ["헬스케어", "원격의료", "디지털전환", "의료"],
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    created_at: new Date().toISOString(),
    source: "SBS뉴스",
    category: "technology"
  },
  {
    id: 6,
    title: "부동산 시장 전망 - 주요 지역 아파트 가격 동향",
    url: "https://example.com/real-estate",
    content: "수도권 주요 지역의 아파트 매매가가 하락세를 보이고 있습니다. 전문가들은 금리 인상과 경기 침체 영향으로 당분간 하락세가 지속될 것으로 전망합니다...",
    image_url: null,
    summary: "수도권 아파트 가격이 하락세를 보이며, 금리 인상 영향으로 당분간 조정 국면이 이어질 전망입니다.",
    sentiment_label: "negative",
    sentiment_score: -0.45,
    keywords: ["부동산", "아파트", "금리", "시장"],
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    created_at: new Date().toISOString(),
    source: "한국경제",
    category: "economy"
  },
  {
    id: 7,
    title: "반도체 수출 회복세 - 메모리 반도체 가격 상승",
    url: "https://example.com/semiconductor",
    content: "글로벌 메모리 반도체 가격이 바닥을 찍고 반등하고 있습니다. 국내 반도체 기업들의 실적 개선이 기대됩니다...",
    image_url: null,
    summary: "메모리 반도체 가격이 회복세를 보이면서 국내 반도체 기업들의 실적 개선이 예상됩니다.",
    sentiment_label: "positive",
    sentiment_score: 0.72,
    keywords: ["반도체", "메모리", "수출", "기업"],
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    created_at: new Date().toISOString(),
    source: "전자신문",
    category: "economy"
  },
  {
    id: 8,
    title: "여야 예산안 협상 난항 - 국회 본회의 처리 불투명",
    url: "https://example.com/politics",
    content: "여야간 예산안 협상이 난항을 겪고 있습니다. 야당은 민생 관련 예산 증액을 요구하고 있으며, 정부여당은 재정 건전성을 강조하고 있습니다...",
    image_url: null,
    summary: null,
    sentiment_label: "negative",
    sentiment_score: -0.55,
    keywords: ["정치", "예산", "국회", "협상"],
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    created_at: new Date().toISOString(),
    source: "MBC뉴스",
    category: "politics"
  }
];
