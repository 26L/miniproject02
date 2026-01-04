import { Newspaper, FileText, Settings, User } from 'lucide-react';

interface HeaderProps {
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
}

export function Header({ onProfileClick, onSettingsClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full gradient-header shadow-md">
      <div className="container flex h-16 max-w-screen-xl items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Newspaper className="h-7 w-7 text-[#90E0EF]" />
          <h1 className="text-xl font-bold text-white tracking-tight">
            뉴스 분석기
          </h1>
        </div>
        
        {/* Navigation */}
        <nav className="flex items-center gap-3">
          {/* Report Button */}
          <a
            href="/report"
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
            aria-label="보고서"
          >
            <FileText className="h-5 w-5" />
          </a>
          
          {/* Settings Button */}
          <button
            onClick={onSettingsClick}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
            aria-label="설정"
          >
            <Settings className="h-5 w-5" />
          </button>
          
          {/* Profile Button */}
          <button
            onClick={onProfileClick}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all p-0.5"
            aria-label="프로필"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#48CAE4] to-[#00A8E8] flex items-center justify-center text-white">
              <User className="h-4 w-4" />
            </div>
          </button>
        </nav>
      </div>
    </header>
  );
}
