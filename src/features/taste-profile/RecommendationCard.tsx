'use client';

import { useState, useEffect } from 'react';
import BookCover from '@/components/ui/BookCover';
import { fetchBookCover } from '@/lib/book-search';
import type { Recommendation } from '@/types/book';

type Props = {
  recommendation: Recommendation;
};

export default function RecommendationCard({ recommendation }: Props) {
  const { title, author, reason, coverUrl: initialCoverUrl } = recommendation;
  const [coverUrl, setCoverUrl] = useState<string | undefined>(initialCoverUrl);
  const [loading, setLoading] = useState(!initialCoverUrl);

  useEffect(() => {
    if (initialCoverUrl) return;
    fetchBookCover(title, author).then((url) => {
      setCoverUrl(url);
      setLoading(false);
    });
  }, [title, author, initialCoverUrl]);

  return (
    <div className='rounded-lg border border-white/8 bg-white/[0.03] p-5'>
      <div className='mb-4 flex gap-3'>
        {loading ? (
          <div className='h-[72px] w-12 shrink-0 animate-pulse rounded bg-white/5' />
        ) : (
          <BookCover title={title} coverUrl={coverUrl} size='md' />
        )}
        <div className='min-w-0'>
          <p className='text-sm font-semibold leading-snug text-white/90'>
            {title}
          </p>
          <p className='mt-0.5 text-xs text-white/40'>{author}</p>
        </div>
      </div>
      <p className='text-sm leading-relaxed text-white/60'>{reason}</p>
    </div>
  );
}
