import { SavedBook } from '@/types/book';

const DEFAULT_LIMIT = 8;

export function selectMostUsedTags(
  books: SavedBook[],
  limit = DEFAULT_LIMIT,
): string[] {
  const frequency = new Map<string, number>();
  for (const tag of books.flatMap((book) => book.tags)) {
    frequency.set(tag, (frequency.get(tag) ?? 0) + 1);
  }
  return [...frequency.entries()]
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, limit)
    .map(([tag]) => tag);
}
