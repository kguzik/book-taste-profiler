import Container from '@/components/ui/Container';

type Props = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  rows: string[][];
};

export default function VibeTags({
  eyebrow,
  heading,
  description,
  rows,
}: Props) {
  return (
    <section className='overflow-hidden py-24 sm:py-32 bg-black'>
      {(eyebrow || heading || description) && (
        <Container className='mb-16 text-center'>
          {eyebrow && (
            <p className='mb-4 text-xs font-medium tracking-widest text-white/35 uppercase'>
              {eyebrow}
            </p>
          )}
          {heading && <h2 className='mb-4'>{heading}</h2>}
          {description && <p className='mx-auto max-w-xl'>{description}</p>}
        </Container>
      )}

      <div className='flex flex-col gap-4'>
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className='group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]'
          >
            <div
              className={`flex w-max gap-3 ${
                rowIndex % 2 === 0
                  ? 'animate-marquee'
                  : 'animate-marquee-reverse'
              } group-hover:[animation-play-state:paused]`}
            >
              {[...row, ...row].map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className='inline-flex cursor-default items-center whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-white/45 transition-colors duration-200 hover:border-white/25 hover:text-white/75'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
