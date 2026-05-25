'use client';

import { useState, useEffect } from 'react';
import type { SavedBook } from '@/types/book';

const STORAGE_KEY = 'btp:saved-books';

type AddBookInput = Omit<SavedBook, 'id' | 'createdAt'>;

export function useSavedBooks() {
  const [books, setBooks] = useState<SavedBook[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setBooks(JSON.parse(raw));
    } catch {
      console.error('Failed to load saved books');
    }
  }, []);

  function addBook(input: AddBookInput) {
    setBooks((prev) => {
      const book: SavedBook = {
        ...input,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      const next = [book, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function removeBook(id: string) {
    setBooks((prev) => {
      const next = prev.filter((b) => b.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  return { books, addBook, removeBook };
}
