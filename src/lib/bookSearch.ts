import type { Book, OpenLibraryResponse } from '@/types/book';

const SEARCH_URL = 'https://openlibrary.org/search.json';
const COVER_URL = 'https://covers.openlibrary.org/b/id';

export function getBookCoverUrl(coverId: number, size: 'S' | 'M' | 'L' = 'M'): string {
  return `${COVER_URL}/${coverId}-${size}.jpg`;
}

export async function searchBooks(query: string): Promise<Book[]> {
  const res = await fetch(
    `${SEARCH_URL}?q=${encodeURIComponent(query)}&limit=10`,
  );
  if (!res.ok) throw new Error('Failed to fetch books');
  const { docs }: OpenLibraryResponse = await res.json();
  return docs.map((raw) => ({
    key: raw.key,
    title: raw.title,
    authors: raw.author_name,
    coverId: raw.cover_i,
    publishYear: raw.first_publish_year,
  }));
}
