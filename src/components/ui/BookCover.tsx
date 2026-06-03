import Image from 'next/image';

type Props = {
  title: string;
  coverUrl?: string;
  size: 'sm' | 'md';
  className?: string;
};

const config = {
  sm: { classes: 'h-20 w-14 rounded-md', sizes: '56px' },
  md: { classes: 'h-[72px] w-12 rounded', sizes: '48px' },
};

export default function BookCover({
  title,
  coverUrl,
  size,
  className = '',
}: Props) {
  const { classes, sizes } = config[size];
  return (
    <div
      className={`relative shrink-0 overflow-hidden bg-white/5 ${classes} ${className}`.trim()}
    >
      {coverUrl && (
        <Image
          src={coverUrl}
          alt={title}
          fill
          className='object-cover'
          sizes={sizes}
        />
      )}
    </div>
  );
}
