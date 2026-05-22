import Image from 'next/image';
import { getBookCoverUrl } from '@/lib/bookSearch';
import type { Book } from '@/types/book';

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  const { title, authors, coverId, publishYear } = book;

  return (
    <div className='flex gap-4 rounded-xl border border-white/8 bg-white/[0.02] p-4 transition-colors duration-200 hover:border-white/15 hover:bg-white/[0.04]'>
      <div className='relative h-20 w-14 flex-shrink-0 overflow-hidden rounded-md bg-white/5'>
        {coverId ? (
          <Image
            src={getBookCoverUrl(coverId)}
            alt={title}
            fill
            className='object-cover'
            sizes='56px'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center'>
            <span className='text-[10px] text-white/15'>No cover</span>
          </div>
        )}
      </div>

      <div className='flex min-w-0 flex-col justify-center gap-1'>
        <p className='truncate text-sm font-medium leading-snug text-white/90'>
          {title}
        </p>
        {authors?.[0] && (
          <p className='truncate text-xs leading-none text-white/45'>
            {authors[0]}
          </p>
        )}
        {publishYear && (
          <p className='text-xs leading-none text-white/25'>{publishYear}</p>
        )}
      </div>
    </div>
  );
}
