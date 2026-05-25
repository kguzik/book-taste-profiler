import type { BookSearchResult } from '@/types/book';

const SEARCH_URL = 'https://openlibrary.org/search.json';
const COVER_BASE = 'https://covers.openlibrary.org/b/id';

type RawDoc = {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
};

type RawResponse = {
  docs: RawDoc[];
};

export async function searchBooks(
  query: string,
  signal?: AbortSignal,
): Promise<BookSearchResult[]> {
  const url = `${SEARCH_URL}?q=${encodeURIComponent(query)}&limit=10&fields=key,title,author_name,first_publish_year,cover_i`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error('Search failed');
  const { docs }: RawResponse = await res.json();
  return docs.map((doc) => ({
    id: doc.key,
    title: doc.title,
    author: doc.author_name?.[0],
    year: doc.first_publish_year,
    coverUrl: doc.cover_i ? `${COVER_BASE}/${doc.cover_i}-M.jpg` : undefined,
  }));
}
