'use client';

import Container from '@/components/ui/Container';
import PageHero from '@/components/sections/PageHero';
import AddBookPanel from '@/features/saved-books/AddBookPanel';
import SavedBooksList from '@/features/saved-books/SavedBooksList';
import { useSavedBooks } from '@/features/saved-books/useSavedBooks';
import { libraryContent } from '@/data/library';

export default function LibraryPage() {
  const { books, addBook, removeBook } = useSavedBooks();

  return (
    <main className='flex flex-1 flex-col bg-black/90'>
      <PageHero
        eyebrow={libraryContent.eyebrow}
        heading={libraryContent.heading}
        description={libraryContent.description}
      />

      <Container className='pb-20'>
        <div className='mb-16 rounded-2xl border border-white/8 bg-white/[0.02] p-8'>
          <h4 className='mb-6'>{libraryContent.addBookHeading}</h4>
          <AddBookPanel addBook={addBook} />
        </div>
        {books.length > 0 && (
          <div>
            <h4 className='mb-6'>
              {books.length} book{books.length === 1 ? '' : 's'} saved
            </h4>
          </div>
        )}
        <SavedBooksList books={books} removeBook={removeBook} />
      </Container>
    </main>
  );
}
