import BookCover from '@/components/ui/BookCover';
import type { BookSearchResult } from '@/types/book';

type Props = {
  book: BookSearchResult;
  onClick?: () => void;
};

const cardBase =
  'flex gap-4 rounded-xl border border-white/8 bg-white/[0.02] p-4 transition-colors duration-200';
const cardIdle = 'hover:border-white/15 hover:bg-white/[0.04]';
const cardClickable =
  'cursor-pointer hover:border-white/20 hover:bg-white/[0.06] w-full text-left';

export default function BookCard({ book, onClick }: Props) {
  const { title, author, year, coverUrl } = book;

  const content = (
    <>
      <BookCover title={title} coverUrl={coverUrl} size='sm' />

      <div className='flex min-w-0 flex-col justify-center gap-1'>
        <p className='truncate text-sm font-medium leading-snug text-white/90'>
          {title}
        </p>
        {author && (
          <p className='truncate text-xs leading-none text-white/45'>
            {author}
          </p>
        )}
        {year && <p className='text-xs leading-none text-white/25'>{year}</p>}
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type='button'
        onClick={onClick}
        className={`${cardBase} ${cardClickable}`}
      >
        {content}
      </button>
    );
  }

  return <div className={`${cardBase} ${cardIdle}`}>{content}</div>;
}
