'use client';

import { useState, useEffect, useRef } from 'react';
import type { SavedBook } from '@/types/book';
import { useAuth } from '@/features/auth/useAuth';
import {
  fetchSavedBooks,
  insertSavedBook,
  deleteSavedBook,
} from '@/lib/saved-books-supabase';
import { loadTasteProfile, clearLocalTasteProfile } from '@/lib/profile-cache';
import { saveTasteProfile } from '@/lib/taste-profile-supabase';

const STORAGE_KEY = 'btp:saved-books';

type AddBookInput = Omit<SavedBook, 'id' | 'createdAt'>;

const readLocalBooks = (): SavedBook[] => {
  try {
    const storedBooks = localStorage.getItem(STORAGE_KEY);
    return storedBooks ? (JSON.parse(storedBooks) as SavedBook[]) : [];
  } catch {
    return [];
  }
};

const writeLocalBooks = (books: SavedBook[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
};

const clearLocalBooks = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const useSavedBooks = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState<SavedBook[]>([]);
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const prevUserId = prevUserIdRef.current;
    prevUserIdRef.current = user?.id ?? null;

    if (user) {
      const localBooks = readLocalBooks();
      const migrateAndFetch = async () => {
        if (prevUserId === null) {
          if (localBooks.length > 0) {
            await Promise.all(
              localBooks.map((book) => insertSavedBook(user.id, book)),
            );
            clearLocalBooks();
          }
          const libraryKey = localBooks
            .map((book) => book.id)
            .sort()
            .join(',');
          const localTasteProfile = loadTasteProfile(libraryKey);
          if (localTasteProfile) {
            await saveTasteProfile(
              user.id,
              localTasteProfile,
              libraryKey,
            ).catch(console.error);
            clearLocalTasteProfile();
          }
        }
        const booksFromSupabase = await fetchSavedBooks(user.id);
        setBooks(booksFromSupabase);
      };
      migrateAndFetch().catch(console.error);
    } else {
      if (prevUserId != null) {
        clearLocalTasteProfile();
      }
      if (prevUserId === undefined) {
        setBooks(readLocalBooks());
      }
    }
  }, [user]);

  const addBook = async (input: AddBookInput) => {
    const book: SavedBook = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    if (user) {
      await insertSavedBook(user.id, book);
      setBooks((currentBooks) => [book, ...currentBooks]);
    } else {
      setBooks((currentBooks) => {
        const updatedBooks = [book, ...currentBooks];
        writeLocalBooks(updatedBooks);
        return updatedBooks;
      });
    }
  };

  const removeBook = async (id: string) => {
    if (user) {
      await deleteSavedBook(id, user.id);
      setBooks((currentBooks) => currentBooks.filter((book) => book.id !== id));
    } else {
      setBooks((currentBooks) => {
        const updatedBooks = currentBooks.filter((book) => book.id !== id);
        writeLocalBooks(updatedBooks);
        return updatedBooks;
      });
    }
  };

  return { books, addBook, removeBook };
};
