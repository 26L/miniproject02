import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Header Area */}
      <header className="bg-white shadow-sm border-b border-gray-100 py-4 px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary tracking-tight">뉴스 인사이트</span>
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-semibold">Pro</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-primary transition-colors">홈</a>
            <a href="#" className="hover:text-primary transition-colors">트렌드</a>
            <a href="#" className="hover:text-primary transition-colors">서비스 소개</a>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
        {children}
      </main>

      {/* Footer Area */}
      <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
          <p>© 2025 뉴스 인사이트 Pro. 모든 권리 보유.</p>
        </div>
      </footer>
    </div>
  );
};
