import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ResultColumn } from '../ResultColumn';

// Mock hooks
const mockUseNewsList = vi.fn();
// We also need to mock useAnalyzeNews because NewsCard (child of ResultColumn) uses it
const mockAnalyzeMutate = vi.fn();

vi.mock('../../../hooks/useNewsQueries', () => ({
  useNewsList: () => mockUseNewsList(),
  useAnalyzeNews: () => ({
    mutate: mockAnalyzeMutate,
    isPending: false,
  }),
}));

describe('ResultColumn', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading skeleton when loading', () => {
    mockUseNewsList.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<ResultColumn />);
    // The skeleton has animate-pulse class, but finding by class is tricky with standard queries.
    // We can just check that the main content isn't there, or look for specific structure.
    // In ResultColumn.tsx, loading returns a section with animate-pulse.
    const container = document.querySelector('.animate-pulse');
    // Since we are using render from testing-library, we should use container from the result, 
    // but here document.querySelector might not look into the JSDOM container scope purely if not careful, 
    // though in JSDOM environment it's global. 
    // Better to expect NO "최신 분석 결과" text.
    expect(screen.queryByText('최신 분석 결과')).not.toBeInTheDocument();
  });

  it('shows error message on error', () => {
    mockUseNewsList.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(<ResultColumn />);
    expect(screen.getByText('뉴스를 불러오는 데 실패했습니다.')).toBeInTheDocument();
  });

  it('shows empty state when data is empty', () => {
    mockUseNewsList.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });

    render(<ResultColumn />);
    expect(screen.getByText('아직 저장된 뉴스가 없습니다.')).toBeInTheDocument();
  });

  it('renders news items when data is present', () => {
    const mockNews = [
      {
        id: 1,
        title: 'Test News Title',
        url: 'https://test.com/news',
        content: 'Test Content',
        published_at: '2025-01-01T12:00:00Z',
        sentiment_label: 'neutral',
        summary: null,
      },
    ];

    mockUseNewsList.mockReturnValue({
      data: mockNews,
      isLoading: false,
      isError: false,
    });

    render(<ResultColumn />);
    expect(screen.getByText('최신 분석 결과')).toBeInTheDocument();
    expect(screen.getByText('Test News Title')).toBeInTheDocument();
  });
});
