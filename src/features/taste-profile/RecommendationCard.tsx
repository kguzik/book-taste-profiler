import Image from 'next/image';
import type { Recommendation } from '@/types/book';

type Props = {
  recommendation: Recommendation;
};

export default function RecommendationCard({ recommendation }: Props) {
  const { title, author, reason, coverUrl } = recommendation;
  return (
    <div className='rounded-lg border border-white/8 bg-white/[0.03] p-5'>
      <div className='mb-4 flex gap-3'>
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={title}
            width={48}
            height={72}
            className='h-[72px] w-12 shrink-0 rounded object-cover'
          />
        ) : (
          <div className='h-[72px] w-12 shrink-0 rounded bg-white/5' />
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
