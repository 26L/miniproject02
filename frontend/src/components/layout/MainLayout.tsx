import { Header } from './Header';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
}

export function MainLayout({ children, onProfileClick, onSettingsClick }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
      <Header onProfileClick={onProfileClick} onSettingsClick={onSettingsClick} />
      <main className="flex-1">
        <div className="container max-w-screen-xl py-6 md:py-10 px-4 md:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
