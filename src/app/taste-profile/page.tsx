import BookSearch from '@/features/book-search/BookSearch';
import Container from '@/components/ui/Container';

export default function SearchPage() {
  return (
    <main className='flex flex-1 flex-col bg-black/90'>
      <Container className='pb-10 pt-16 text-center'>
        <h1 className='mb-4'>Find your next book</h1>
        <p className='mx-auto max-w-md'>
          Search by title, author, or theme to discover books that match your
          taste.
        </p>
      </Container>
      <BookSearch />
    </main>
  );
}
