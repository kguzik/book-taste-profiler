'use client';

import Container from '@/components/ui/Container';
import PageHero from '@/components/sections/PageHero';
import AddBookPanel from '@/features/saved-books/AddBookPanel';
import GuestLimit from '@/features/saved-books/GuestLimit';
import SavedBooksList from '@/features/saved-books/SavedBooksList';
import Button from '@/components/ui/Button';
import { useSavedBooks } from '@/features/saved-books/useSavedBooks';
import { useAuth } from '@/features/auth/useAuth';
import { libraryContent } from '@/data/library';
import { MIN_BOOKS_FOR_PROFILE } from '@/data/taste-profile';
import { pluralize } from '@/lib/pluralize';

const FREE_BOOK_LIMIT = 3;

export default function LibraryPageContent() {
  const { books, addBook, removeBook } = useSavedBooks();
  const { user } = useAuth();
  const showGate = !user && books.length >= FREE_BOOK_LIMIT;
  const { tasteProfileCta } = libraryContent;

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
            <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
              <h4>
                {books.length} {pluralize(books.length, 'book')} saved
              </h4>
              {books.length < MIN_BOOKS_FOR_PROFILE ? (
                <div className='flex items-center gap-3'>
                  <div className='flex items-center gap-1.5'>
                    {Array.from({ length: MIN_BOOKS_FOR_PROFILE }, (_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                          i < books.length ? 'bg-white/40' : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                  <span className='text-xs text-white/30'>
                    {tasteProfileCta.progress}
                  </span>
                </div>
              ) : (
                <Button
                  variant='secondary'
                  href='/taste-profile'
                  className='text-xs'
                >
                  {tasteProfileCta.button}
                </Button>
              )}
            </div>
          </div>
        )}
        <SavedBooksList books={books} removeBook={removeBook} />
      </Container>
    </main>
  );
}
