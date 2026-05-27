'use client';

import { useState, useEffect } from 'react';
import { useSavedBooks } from '@/features/saved-books/useSavedBooks';
import { MIN_BOOKS_FOR_PROFILE, tasteProfileContent } from '@/data/taste-profile';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import { pluralize } from '@/lib/pluralize';

export default function TasteProfile() {
  const { books } = useSavedBooks();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const { needMoreBooks, ready } = tasteProfileContent;

  if (books.length < MIN_BOOKS_FOR_PROFILE) {
    return (
      <Container className='pb-16'>
        <div className='rounded-xl border border-white/8 bg-white/[0.02] p-8'>
          <Text
            heading={needMoreBooks.heading}
            subtext={needMoreBooks.description}
          />
          <div className='mt-6 flex items-center gap-2'>
            {Array.from({ length: MIN_BOOKS_FOR_PROFILE }, (_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                  i < books.length ? 'bg-white/60' : 'bg-white/10'
                }`}
              />
            ))}
            <span className='ml-2 text-xs text-white/25'>
              {books.length} of {MIN_BOOKS_FOR_PROFILE}
            </span>
          </div>
          <div className='mt-7'>
            <Button href={needMoreBooks.ctaHref}>{needMoreBooks.ctaLabel}</Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className='pb-16'>
      <div className='rounded-xl border border-white/8 bg-white/[0.02] p-8'>
        <p className='mb-3 text-xs font-medium tracking-widest text-white/25 uppercase'>
          Profile based on {books.length} {pluralize(books.length, 'book')}
        </p>
        <Text heading={ready.heading} subtext={ready.description} />
      </div>
    </Container>
  );
}
