'use client';

import { useState } from 'react';
import BookCard from './BookCard';
import { useBookSearch } from './useBookSearch';
import type { BookSearchResult } from '@/types/book';
import { libraryContent } from '@/data/library';

type Props = {
  onSelect?: (book: BookSearchResult) => void;
};

export default function BookSearch({ onSelect }: Props) {
  const [query, setQuery] = useState('');
  const { results, loading, error } = useBookSearch(query);

  const showEmpty =
    !loading && !error && query.trim().length >= 2 && results.length === 0;

  return (
    <div className='flex flex-col gap-3'>
      <h4 className='mb-2'>{libraryContent.addBookHeading}</h4>
      <input
        type='search'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search by title, author, or keyword…'
        autoFocus={!!onSelect}
        className='w-full rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm text-white outline-none transition-colors duration-200 placeholder:text-white/25 focus:border-white/25'
      />

      {loading && (
        <p className='text-center text-sm text-white/35'>Searching…</p>
      )}

      {error && <p className='text-center text-sm text-white/35'>{error}</p>}

      {showEmpty && (
        <p className='text-center text-sm text-white/35'>
          No books found for &ldquo;{query}&rdquo;
        </p>
      )}

      {results.length > 0 && (
        <div className='flex flex-col gap-2'>
          {results.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={onSelect ? () => onSelect(book) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
