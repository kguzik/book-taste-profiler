import Pill from '@/components/ui/Pill';
import type { SavedBook } from '@/types/book';

type Props = {
  books: SavedBook[];
  removeBook: (id: string) => void;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function SavedBooksList({ books, removeBook }: Props) {
  if (books.length === 0) {
    return (
      <div className='flex flex-col items-center py-20 text-center'>
        <p className='text-sm text-white/20'>No books added yet.</p>
        <p className='mt-1 text-sm text-white/15'>
          Add a book above to start building your taste profile.
        </p>
      </div>
    );
  }

  return (
    <ul className='flex flex-col gap-4'>
      {books.map((book) => (
        <li
          key={book.id}
          className='rounded-xl border border-white/8 bg-white/[0.02] p-5 transition-colors duration-200 hover:border-white/12 hover:bg-white/[0.03]'
        >
          <div className='flex gap-4'>
            {book.coverUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={book.coverUrl}
                alt=''
                width={48}
                height={72}
                className='h-[72px] w-12 shrink-0 self-start rounded object-cover'
              />
            )}
            <div className='min-w-0 flex-1'>
              <div className='flex items-start justify-between gap-4'>
                <div>
                  <p className='text-sm font-semibold text-white leading-snug'>
                    {book.title}
                  </p>
                  {(book.author || book.year) && (
                    <p className='mt-0.5 text-xs text-white/40'>
                      {[book.author, book.year].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </div>
                <button
                  type='button'
                  onClick={() => removeBook(book.id)}
                  aria-label={`Remove ${book.title}`}
                  className='shrink-0 text-xs text-white/20 transition-colors duration-200 hover:text-white/60'
                >
                  Remove
                </button>
              </div>

              {book.notes && (
                <p className='mt-3 text-sm leading-relaxed text-white/50'>
                  {book.notes}
                </p>
              )}

              {book.tags.length > 0 && (
                <div className='mt-3 flex flex-wrap gap-1.5'>
                  {book.tags.map((tag) => (
                    <Pill key={tag}>{tag}</Pill>
                  ))}
                </div>
              )}

              <p className='mt-3 text-xs text-white/20'>
                {formatDate(book.createdAt)}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
