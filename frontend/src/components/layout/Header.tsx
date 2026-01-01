import { Newspaper } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <Newspaper className="h-6 w-6" />
          <span>News Insight Pro</span>
        </div>
        <nav className="flex flex-1 items-center justify-end space-x-4">
          <a
            href="https://github.com/news-insight-pro"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
