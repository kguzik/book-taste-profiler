import type { SavedBook } from '@/types/book';

export const MIN_BOOKS_FOR_PROFILE = 3;

export function buildTasteProfilePrompt(books: SavedBook[]): string {
  const bookList = books
    .map((book) => {
      const tags = book.tags.join(', ') || 'none';
      const notes = book.notes ? `; notes: "${book.notes}"` : '';
      return `- "${book.title}" by ${book.author ?? 'Unknown'} (tags: ${tags}${notes})`;
    })
    .join('\n');

  return `You are a literary taste analyst. Based on the following books a user loved and the vibe tags they selected, write a 3-4 sentence taste profile summary written in second person, starting with "You" - for example "You love..." or "You gravitate toward..." - as if speaking directly to the reader and recommend 3 books they would likely enjoy.

Books:
${bookList}

Respond in this exact JSON format:
{
  "summary": "...",
  "recommendations": [
    { "title": "...", "author": "...", "reason": "..." },
    { "title": "...", "author": "...", "reason": "..." },
    { "title": "...", "author": "...", "reason": "..." }
  ]
}`;
}

export const tasteProfileContent = {
  hero: {
    eyebrow: 'Taste profile',
    heading: 'Your reading taste',
    description:
      "A map of what moves you - built from the books you've loved and the notes you've left behind.",
  },
  needMoreBooks: {
    heading: 'Add a few more books',
    description:
      "Your taste profile takes shape once you've added at least three books. The more you add, the richer the picture.",
    ctaLabel: 'Go to your library',
    ctaHref: '/library',
  },
  ready: {
    heading: 'Your reading taste, distilled',
    description:
      'Based on the books you loved and the vibes you chose, here is how your taste reads.',
  },
  profile: {
    loading: 'Analysing your taste…',
    error: 'Could not generate your profile.',
    topVibesHeading: 'Your top vibes',
    recommendationsHeading: 'Recommendations',
    regenerateLabel: 'Regenerate',
  },
};
