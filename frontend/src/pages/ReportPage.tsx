import { 
  ArrowLeft, 
  Info, 
  Puzzle, 
  Palette, 
  Code, 
  Accessibility, 
  Map, 
  Flag, 
  Check, 
  Clock,
  Circle
} from 'lucide-react';

export function ReportPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="gradient-header text-white py-12 px-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center gap-3">
          <span className="text-2xl">📄</span>
          프로젝트 보고서
        </h1>
        <p className="text-lg opacity-90 mb-6">
          뉴스 요약 및 감정 분석 UI - 상세 구현 문서
        </p>
        <div className="flex justify-center gap-8 flex-wrap text-sm opacity-80">
          <span className="flex items-center gap-2">📅 2024년 1월</span>
          <span className="flex items-center gap-2">🔀 Version 1.0</span>
          <span className="flex items-center gap-2">✅ 완료</span>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border py-4 px-8">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 text-primary font-medium text-sm hover:underline">
            <ArrowLeft className="h-4 w-4" />
            메인으로 돌아가기
          </a>
          <ul className="hidden md:flex gap-6 list-none">
            {['개요', '기능', '디자인', '기술', '로드맵'].map((item) => (
              <li key={item}>
                <a href={`#${item}`} className="text-muted-foreground text-sm font-medium hover:text-primary transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto py-12 px-8">
        {/* Overview Section */}
        <section id="개요" className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-border">
            <Info className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">1. 프로젝트 개요</h2>
          </div>
          <div className="text-muted-foreground space-y-4">
            <p>
              <strong className="text-foreground">뉴스 요약 및 감정 분석 UI</strong>는 사용자가 키워드를 검색하면 관련 뉴스를 보여주고,
              각 뉴스의 감정(긍정/중립/부정)을 분석하여 시각적으로 제공하는 웹 애플리케이션입니다.
            </p>
            <p>
              본 프로젝트는 Frontend UI Design Guideline을 기반으로 설계되었으며,
              <strong className="text-foreground"> Ocean Blue</strong> 색상 테마와 일관된 컴포넌트 시스템을 적용하여 사용자 경험을 최적화했습니다.
            </p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {[
              { value: '15+', label: 'React 컴포넌트' },
              { value: '1', label: 'CSS 시스템' },
              { value: '100%', label: '반응형 지원' },
              { value: 'TypeScript', label: '타입 안전성' },
            ].map((stat) => (
              <div key={stat.label} className="gradient-primary text-white p-6 rounded-lg text-center">
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="기능" className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-border">
            <Puzzle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">2. 구현 기능</h2>
          </div>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { icon: '🔍', title: '뉴스 검색', desc: '키워드 또는 문장으로 뉴스를 검색하고, 카테고리/기간 필터를 적용할 수 있습니다.' },
              { icon: '🔥', title: '추천 뉴스', desc: '오늘의 주요 뉴스와 인기 키워드를 제공하여 빠른 탐색을 지원합니다.' },
              { icon: '📊', title: '감정 분석', desc: '뉴스의 감정을 긍정/중립/부정으로 분류하고 차트로 시각화합니다.' },
              { icon: '👤', title: '사용자 프로필', desc: '프로필 관리, 관심 분야 설정, 활동 통계를 확인할 수 있습니다.' },
              { icon: '🔖', title: '북마크', desc: '관심 있는 뉴스를 북마크하여 나중에 확인할 수 있습니다.' },
              { icon: '📱', title: '반응형 디자인', desc: '데스크톱, 태블릿, 모바일 모든 환경에서 최적화된 경험을 제공합니다.' },
            ].map((feature) => (
              <div key={feature.title} className="bg-background rounded-lg p-6 border border-border">
                <h4 className="flex items-center gap-2 font-semibold mb-3">
                  <span>{feature.icon}</span>
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Implementation Status Table */}
          <h3 className="text-lg font-semibold mt-8 mb-4">기능 구현 현황</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-background">
                  <th className="p-4 text-left font-semibold">기능</th>
                  <th className="p-4 text-left font-semibold">설명</th>
                  <th className="p-4 text-left font-semibold">상태</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: '뉴스 검색', desc: '키워드 검색 및 필터링', status: 'complete' },
                  { name: '추천 뉴스', desc: '오늘의 주요 뉴스 표시', status: 'complete' },
                  { name: '인기 키워드', desc: '트렌딩 키워드 태그', status: 'complete' },
                  { name: '감정 분석 시각화', desc: '도넛 차트 + 바 그래프', status: 'complete' },
                  { name: '사용자 프로필', desc: '프로필 카드 + 설정 모달', status: 'complete' },
                  { name: '북마크 기능', desc: '뉴스 저장 기능', status: 'complete' },
                  { name: '실제 뉴스 API 연동', desc: '외부 API 데이터 연결', status: 'pending' },
                  { name: '검색 히스토리', desc: '검색 기록 저장', status: 'pending' },
                ].map((item) => (
                  <tr key={item.name} className="border-b border-border hover:bg-background/50">
                    <td className="p-4">{item.name}</td>
                    <td className="p-4 text-muted-foreground">{item.desc}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'complete' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.status === 'complete' ? <Check className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                        {item.status === 'complete' ? '완료' : '대기'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Design Section */}
        <section id="디자인" className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-border">
            <Palette className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">3. 디자인 시스템</h2>
          </div>
          
          <h3 className="text-lg font-semibold mb-4">3.1 색상 팔레트 (Ocean Blue)</h3>
          <p className="text-muted-foreground mb-6">
            본 프로젝트는 Ocean Blue 테마를 기반으로 역할 기반 색상 시스템을 적용했습니다.
          </p>
          
          {/* Color Palette */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {[
              { name: 'Primary', color: '#0077B6', gradient: 'linear-gradient(135deg, #0077B6 0%, #023E8A 100%)' },
              { name: 'Secondary', color: '#023E8A', gradient: '#023E8A' },
              { name: 'Accent', color: '#48CAE4', gradient: '#48CAE4' },
              { name: 'Success', color: '#10B981', gradient: '#10B981' },
              { name: 'Warning', color: '#F59E0B', gradient: '#F59E0B' },
              { name: 'Error', color: '#EF4444', gradient: '#EF4444' },
            ].map((swatch) => (
              <div key={swatch.name} className="text-center">
                <div 
                  className="h-20 rounded-lg shadow-sm mb-2" 
                  style={{ background: swatch.gradient }}
                />
                <span className="block text-sm font-semibold">{swatch.name}</span>
                <span className="block text-xs text-muted-foreground">{swatch.color}</span>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-4 mt-8">3.2 감정 표현 규칙</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-background">
                  <th className="p-4 text-left font-semibold">감정</th>
                  <th className="p-4 text-left font-semibold">색상 역할</th>
                  <th className="p-4 text-left font-semibold">시각적 표현</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Positive 긍정</span></td>
                  <td className="p-4">Success (녹색)</td>
                  <td className="p-4 text-muted-foreground">텍스트 "긍정" + 녹색 배경 + 😊 아이콘</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4"><span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold">Neutral 중립</span></td>
                  <td className="p-4">Warning (노란색)</td>
                  <td className="p-4 text-muted-foreground">텍스트 "중립" + 노란색 배경 + 😐 아이콘</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4"><span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">Negative 부정</span></td>
                  <td className="p-4">Error (빨간색)</td>
                  <td className="p-4 text-muted-foreground">텍스트 "부정" + 빨간색 배경 + 😟 아이콘</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Tech Section */}
        <section id="기술" className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-border">
            <Code className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">4. 기술 스택</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { icon: '⚛️', title: 'React 18', desc: '컴포넌트 기반 UI 라이브러리' },
              { icon: '🔷', title: 'TypeScript', desc: '타입 안전성 및 개발 생산성' },
              { icon: '🎨', title: 'Tailwind CSS', desc: '유틸리티 기반 CSS 프레임워크' },
              { icon: '🔄', title: 'React Query', desc: '서버 상태 관리 및 캐싱' },
              { icon: '🎯', title: 'Lucide Icons', desc: '아이콘 시스템' },
              { icon: '⚡', title: 'Vite', desc: '빠른 개발 서버 및 빌드' },
            ].map((tech) => (
              <div key={tech.title} className="bg-background rounded-lg p-6 border border-border">
                <h4 className="flex items-center gap-2 font-semibold mb-3">
                  <span>{tech.icon}</span>
                  {tech.title}
                </h4>
                <p className="text-sm text-muted-foreground">{tech.desc}</p>
              </div>
            ))}
          </div>

          {/* File Structure */}
          <h3 className="text-lg font-semibold mb-4">파일 구조</h3>
          <div className="bg-[#1E293B] text-[#E2E8F0] rounded-lg p-6 font-mono text-sm overflow-x-auto">
            <pre>{`frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MainLayout.tsx
│   │   └── ui/
│   │       └── ...
│   ├── features/
│   │   └── dashboard/
│   │       ├── SearchArea.tsx
│   │       ├── ProfilePanel.tsx
│   │       ├── TodayNewsPanel.tsx
│   │       ├── TrendPanel.tsx
│   │       ├── SentimentPanel.tsx
│   │       ├── NewsCard.tsx
│   │       ├── NewsGrid.tsx
│   │       └── ProfileModal.tsx
│   ├── pages/
│   │   ├── DashboardPage.tsx
│   │   └── ReportPage.tsx
│   ├── services/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css`}</pre>
          </div>
        </section>

        {/* Accessibility Section */}
        <section className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-border">
            <Accessibility className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">5. 접근성 준수 사항</h2>
          </div>
          
          <ul className="space-y-4">
            {[
              { title: '색상 의존성 제거', desc: '감정 분석 결과를 색상 + 텍스트로 동시 표현' },
              { title: '키보드 접근성', desc: '모든 인터랙티브 요소에 키보드 포커스 지원' },
              { title: 'ARIA 레이블', desc: '버튼, 입력창 등에 aria-label 속성 추가' },
              { title: '시맨틱 마크업', desc: 'header, main, section, article, aside 등 적절한 태그 사용' },
              { title: 'Reduced Motion', desc: 'prefers-reduced-motion 미디어 쿼리 지원' },
              { title: '포커스 표시', desc: '모든 포커스 가능 요소에 명확한 아웃라인 스타일' },
            ].map((item) => (
              <li key={item.title} className="flex items-start gap-3 py-3 border-b border-border last:border-b-0">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground">{item.title}:</strong>{' '}
                  <span className="text-muted-foreground">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Roadmap Section */}
        <section id="로드맵" className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-border">
            <Map className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">6. 개발 로드맵</h2>
          </div>
          
          {/* Timeline */}
          <div className="relative pl-8 border-l-2 border-border space-y-8 mb-8">
            {[
              { phase: 'Phase 1', title: '기본 UI 구현', desc: '레이아웃, 색상 시스템, 검색 기능, 뉴스 카드', status: 'complete' },
              { phase: 'Phase 2', title: '감정 분석 시각화', desc: '도넛 차트, 바 그래프, 감정 색상 시스템', status: 'complete' },
              { phase: 'Phase 3', title: '사용자 프로필', desc: '프로필 카드, 설정 모달, LocalStorage 연동', status: 'complete' },
              { phase: 'Phase 4', title: 'API 연동', desc: '실제 뉴스 API 연결, 감정 분석 API 통합', status: 'pending' },
              { phase: 'Phase 5', title: '고급 기능', desc: '검색 히스토리, 북마크 목록, 개인화 추천', status: 'pending' },
            ].map((item) => (
              <div key={item.phase} className="relative">
                <div className={`absolute -left-[41px] w-3 h-3 rounded-full border-2 border-white ${
                  item.status === 'complete' ? 'bg-green-500' : 'bg-amber-500'
                }`} />
                <div className="text-xs text-muted-foreground mb-1">{item.phase} - {item.status === 'complete' ? '완료' : '예정'}</div>
                <div className="font-semibold mb-1">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-4">향후 개선 계획</h3>
          <ul className="space-y-3">
            {[
              '실시간 뉴스 API 연동 (NewsAPI, GDELT 등)',
              '북마크 목록 전용 페이지 구현',
              '검색 히스토리 저장 및 관리',
              '다크 모드 지원',
              'PWA (Progressive Web App) 전환',
              '다국어 지원 (i18n)',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 py-3 border-b border-border last:border-b-0">
                <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Conclusion Section */}
        <section className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-border">
            <Flag className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">7. 결론</h2>
          </div>
          
          <div className="text-muted-foreground space-y-4 mb-8">
            <p>
              본 프로젝트는 Frontend UI Design Guideline을 충실히 반영하여 구현되었습니다.
              <strong className="text-foreground"> Ocean Blue</strong> 색상 테마, 2컬럼 레이아웃, 감정 분석 시각화, 사용자 프로필 기능 등
              핵심 요구사항을 모두 완료했습니다.
            </p>
            <p>
              접근성, 반응형 디자인, 일관된 컴포넌트 시스템을 통해 다양한 환경에서
              최적의 사용자 경험을 제공합니다. 향후 실제 API 연동과 고급 기능 추가를 통해
              완성도 높은 뉴스 분석 플랫폼으로 발전할 수 있습니다.
            </p>
          </div>

          <div className="text-center">
            <a 
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 gradient-primary text-white rounded-lg font-semibold transition-all hover:translate-y-[-2px] hover:shadow-lg"
            >
              🏠 메인 페이지로 이동
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#023E8A] text-white py-8 text-center text-sm">
        <p>&copy; 2024 뉴스 분석기. All rights reserved.</p>
        <p className="mt-2 opacity-70">이 문서는 프로젝트의 설계 및 구현 내용을 정리한 상세 보고서입니다.</p>
      </footer>
    </div>
  );
}
