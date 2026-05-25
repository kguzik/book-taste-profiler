'use client';

import { useEffect, useRef, useState } from 'react';
import { searchBooks } from '@/lib/book-search';
import type { BookSearchResult } from '@/types/book';

type State = {
  results: BookSearchResult[];
  loading: boolean;
  error: string | null;
};

const emptyState: State = { results: [], loading: false, error: null };

export function useBookSearch(query: string): State {
  const [state, setState] = useState<State>(emptyState);
  const abortRef = useRef<AbortController | null>(null);
  const trimmed = query.trim();

  useEffect(() => {
    if (trimmed.length < 2) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState(emptyState);
      return;
    }

    const timer = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setState({ results: [], loading: true, error: null });

      try {
        const results = await searchBooks(trimmed, controller.signal);
        setState({ results, loading: false, error: null });
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setState({ results: [], loading: false, error: 'Something went wrong. Please try again.' });
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      abortRef.current?.abort();
    };
  }, [trimmed]);

  return trimmed.length < 2 ? emptyState : state;
}
