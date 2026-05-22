'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import BookCard from './BookCard';
import { useBookSearch } from './useBookSearch';

export default function BookSearch() {
  const [query, setQuery] = useState('');
  const { results, loading, error } = useBookSearch(query);

  const showEmpty = !loading && !error && query.trim() && results.length === 0;

  return (
    <Container className='pb-12'>
      <input
        type='search'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search by title, author, or keyword…'
        className='mb-8 w-full rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm text-white outline-none transition-colors duration-200 placeholder:text-white/25 focus:border-white/25'
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
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          {results.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      )}
    </Container>
  );
}
