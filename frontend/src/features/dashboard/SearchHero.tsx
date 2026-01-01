import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchHeroProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export function SearchHero({ onSearch, isLoading }: SearchHeroProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-24 space-y-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Discover the Hidden Insights in News
        </h1>
        <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
          AI-powered analysis to summarize trends and sentiments from global news sources in seconds.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex w-full max-w-lg items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search topics (e.g. Tesla, AI, Bitcoin)..."
            className="pl-9 h-12 text-lg shadow-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button type="submit" size="lg" className="h-12 px-8" isLoading={isLoading}>
          Search
        </Button>
      </form>
    </div>
  );
}
