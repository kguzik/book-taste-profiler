'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSavedBooks } from '@/features/saved-books/useSavedBooks';
import {
  MIN_BOOKS_FOR_PROFILE,
  tasteProfileContent,
} from '@/data/taste-profile';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import RecommendationCard from './RecommendationCard';
import TopTags from './TopTags';
import { pluralize } from '@/lib/pluralize';
import { saveProfile, loadProfile, clearProfile } from '@/lib/profile-cookie';
import { selectMostUsedTags } from '@/lib/select-most-used-tags';
import type { TasteProfileResponse } from '@/types/book';

function bookFingerprint(books: ReturnType<typeof useSavedBooks>['books']) {
  return books
    .map((book) => book.id)
    .sort()
    .join(',');
}

export default function TasteProfile() {
  const { books } = useSavedBooks();
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<TasteProfileResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(false);
    setProfile(null);
    try {
      const res = await fetch('/api/taste-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ books }),
      });
      if (!res.ok) throw new Error();
      const data: TasteProfileResponse = await res.json();
      saveProfile(data, bookFingerprint(books));
      setProfile(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [books]);

  const regenerate = useCallback(() => {
    clearProfile();
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (!mounted) return;
    if (books.length < MIN_BOOKS_FOR_PROFILE) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile(null);
      return;
    }
    const fingerprint = bookFingerprint(books);
    const cached = loadProfile(fingerprint);
    if (cached) {
      setProfile(cached);
    } else {
      fetchProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, books.length]);

  if (!mounted) return null;

  const { needMoreBooks, ready, profile: profileContent } = tasteProfileContent;
  const topTags = selectMostUsedTags(books, 8);

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
            <Button href={needMoreBooks.ctaHref}>
              {needMoreBooks.ctaLabel}
            </Button>
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

        <div className='mt-8'>
          {loading && (
            <p className='animate-pulse text-sm text-white/40'>
              {profileContent.loading}
            </p>
          )}

          {error && !loading && (
            <div className='flex items-center gap-4'>
              <p className='text-sm text-white/40'>{profileContent.error}</p>
              <Button onClick={fetchProfile}>Retry</Button>
            </div>
          )}

          {profile && !loading && (
            <div className='space-y-8'>
              <TopTags tags={topTags} />
              <p className='text-base leading-relaxed text-white/70'>
                {profile.summary}
              </p>
              <div>
                <p className='mb-4 text-xs font-medium tracking-widest text-white/25 uppercase'>
                  {profileContent.recommendationsHeading}
                </p>
                <div className='grid gap-4 sm:grid-cols-3'>
                  {profile.recommendations.map((rec) => (
                    <RecommendationCard
                      key={`${rec.title}-${rec.author}`}
                      recommendation={rec}
                    />
                  ))}
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <Button
                  variant='secondary'
                  onClick={regenerate}
                  className='text-xs'
                  disabled={books.length <= MIN_BOOKS_FOR_PROFILE}
                >
                  {profileContent.regenerateLabel}
                </Button>
                {books.length <= MIN_BOOKS_FOR_PROFILE && (
                  <span className='text-xs text-white/25'>
                    {profileContent.regenerateDescription}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
