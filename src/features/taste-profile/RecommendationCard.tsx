import type { Recommendation } from '@/types/book';

type Props = {
  recommendation: Recommendation;
};

export default function RecommendationCard({ recommendation }: Props) {
  const { title, author, reason } = recommendation;
  return (
    <div className='rounded-lg border border-white/8 bg-white/[0.03] p-5'>
      <p className='text-sm font-semibold text-white/90'>{title}</p>
      <p className='mt-0.5 text-xs text-white/40'>{author}</p>
      <p className='mt-3 text-sm leading-relaxed text-white/60'>{reason}</p>
    </div>
  );
}
