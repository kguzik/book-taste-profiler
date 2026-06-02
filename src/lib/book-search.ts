import { BookSearchResult } from '@/types/book';

const OPEN_LIBRARY_SEARCH_URL = 'https://openlibrary.org/search.json';
const OPEN_LIBRARY_COVER_URL = 'https://covers.openlibrary.org/b/id';

type OpenLibraryBook = {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
};

type OpenLibrarySearchResponse = {
  docs: OpenLibraryBook[];
};

export async function fetchBookCover(
  title: string,
  author: string,
): Promise<string | undefined> {
  const query = `${title} ${author}`;
  const url = `${OPEN_LIBRARY_SEARCH_URL}?q=${encodeURIComponent(query)}&limit=1&fields=cover_i`;

  try {
    const response = await fetch(url);
    if (!response.ok) return undefined;
    const { docs }: OpenLibrarySearchResponse = await response.json();
    const cover = docs[0]?.cover_i;
    return cover ? `${OPEN_LIBRARY_COVER_URL}/${cover}-M.jpg` : undefined;
  } catch {
    return undefined;
  }
}

export async function searchBooks(
  query: string,
  signal?: AbortSignal,
): Promise<BookSearchResult[]> {
  const searchUrl = `${OPEN_LIBRARY_SEARCH_URL}?q=${encodeURIComponent(query)}&limit=10&fields=key,title,author_name,first_publish_year,cover_i`;

  const response = await fetch(searchUrl, { signal });

  if (!response.ok) throw new Error('Search failed');

  const { docs: books }: OpenLibrarySearchResponse = await response.json();

  return books.map((book) => ({
    id: book.key,
    title: book.title,
    author: book.author_name?.[0],
    year: book.first_publish_year,
    coverUrl: book.cover_i
      ? `${OPEN_LIBRARY_COVER_URL}/${book.cover_i}-M.jpg`
      : undefined,
  }));
}
