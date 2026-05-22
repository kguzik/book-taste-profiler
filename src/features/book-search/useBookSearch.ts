'use client';

import { useEffect, useRef, useState } from 'react';
import { searchBooks } from '@/lib/bookSearch';
import type { Book } from '@/types/book';

type State = {
  results: Book[];
  loading: boolean;
  error: string | null;
};

const emptyState: State = { results: [], loading: false, error: null };

export function useBookSearch(query: string): State {
  const [state, setState] = useState<State>(emptyState);
  const [lastFetchedQuery, setLastFetchedQuery] = useState<string>('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trimmed = query.trim();

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!trimmed) return;

    timeoutRef.current = setTimeout(async () => {
      setState({ results: [], loading: true, error: null });
      try {
        const books = await searchBooks(trimmed);
        setLastFetchedQuery(trimmed);
        setState({ results: books, loading: false, error: null });
      } catch {
        setLastFetchedQuery(trimmed);
        setState({
          results: [],
          loading: false,
          error: 'Something went wrong. Please try again.',
        });
      }
    }, 400);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [trimmed]);

  const isStale = !state.loading && trimmed !== lastFetchedQuery;
  return !trimmed || isStale ? emptyState : state;
}
