import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchArea } from '../SearchArea';

// Mock the hook
const mockMutate = vi.fn();
vi.mock('../../../hooks/useNewsQueries', () => ({
  useSearchNews: () => ({
    mutate: mockMutate,
    isPending: false,
  }),
}));

describe('SearchArea', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<SearchArea />);
    expect(screen.getByText(/AI 인사이트로/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/키워드를 입력해 주세요/i)).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<SearchArea />);
    const input = screen.getByPlaceholderText(/키워드를 입력해 주세요/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Bitcoin' } });
    expect(input.value).toBe('Bitcoin');
  });

  it('calls search mutation when button is clicked', () => {
    render(<SearchArea />);
    const input = screen.getByPlaceholderText(/키워드를 입력해 주세요/i);
    const button = screen.getByText('검색하기');

    fireEvent.change(input, { target: { value: 'Tesla' } });
    fireEvent.click(button);

    expect(mockMutate).toHaveBeenCalledWith('Tesla');
  });

  it('does not search if input is empty', () => {
    render(<SearchArea />);
    const button = screen.getByText('검색하기');
    
    fireEvent.click(button);
    expect(mockMutate).not.toHaveBeenCalled();
  });
});
