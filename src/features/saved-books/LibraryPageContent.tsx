'use client';

import Container from '@/components/ui/Container';
import PageHero from '@/components/sections/PageHero';
import AddBookPanel from '@/features/saved-books/AddBookPanel';
import GuestLimit from '@/features/saved-books/GuestLimit';
import SavedBooksList from '@/features/saved-books/SavedBooksList';
import { useSavedBooks } from '@/features/saved-books/useSavedBooks';
import { useAuth } from '@/features/auth/useAuth';
import { libraryContent } from '@/data/library';
import { pluralize } from '@/lib/pluralize';

const FREE_BOOK_LIMIT = 3;

export default function LibraryPageContent() {
  const { books, addBook, removeBook } = useSavedBooks();
  const { user } = useAuth();
  const showGate = !user && books.length >= FREE_BOOK_LIMIT;

  return (
    <main className='flex flex-1 flex-col bg-black/90'>
      <PageHero
        eyebrow={libraryContent.eyebrow}
        heading={libraryContent.heading}
        description={libraryContent.description}
      />

      <Container className='pb-20'>
        <div className='mb-16 rounded-2xl border border-white/8 bg-white/[0.02] p-8'>
          {showGate ? <GuestLimit /> : <AddBookPanel addBook={addBook} />}
        </div>
        {books.length > 0 && (
          <div>
            <h4 className='mb-6'>
              {books.length} {pluralize(books.length, 'book')} saved
            </h4>
          </div>
        )}
        <SavedBooksList books={books} removeBook={removeBook} />
      </Container>
    </main>
  );
}
