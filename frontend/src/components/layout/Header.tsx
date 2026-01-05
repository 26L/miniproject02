import { Newspaper, FileText, User, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  onProfileClick?: () => void;
  onLoginClick?: () => void;
}

export function Header({ onProfileClick, onLoginClick }: HeaderProps) {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Optionally reload or show a message
  };

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
          
          {isAuthenticated ? (
            <>
              {/* User Info */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm">
                <User size={16} />
                <span className="font-medium">{user?.username}</span>
              </div>

              {/* Profile Button */}
              <button
                onClick={onProfileClick}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all p-0.5"
                aria-label="프로필 설정"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#48CAE4] to-[#00A8E8] flex items-center justify-center text-white">
                  <User className="h-4 w-4" />
                </div>
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-red-500/20 hover:border-red-400/30 transition-all"
                aria-label="로그아웃"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </>
          ) : (
            <>
              {/* Login Button */}
              <button
                onClick={onLoginClick}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                aria-label="로그인"
              >
                <LogIn className="h-5 w-5" />
                <span className="hidden sm:inline font-medium">로그인</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
