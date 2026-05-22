import Container from '@/components/ui/Container';

type Card = {
  subtitle?: string;
  title: string;
  description?: string;
};

type Props = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  cards: Card[];
};

export default function CardGrid({
  eyebrow,
  heading,
  description,
  cards,
}: Props) {
  return (
    <section className='py-24 sm:py-32 bg-black/85'>
      <Container>
        {(eyebrow || heading || description) && (
          <div className='mb-16 text-center'>
            {eyebrow && (
              <p className='mb-4 text-xs font-medium tracking-widest text-white/35 uppercase'>
                {eyebrow}
              </p>
            )}
            {heading && <h2 className='mb-4'>{heading}</h2>}
            {description && <p className='mx-auto max-w-xl'>{description}</p>}
          </div>
        )}

        <div className='flex flex-wrap justify-center gap-6'>
          {cards.map((card) => (
            <div
              key={card.title}
              className='basis-full md:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)] rounded-2xl border border-white/8 bg-white/[0.02] p-8'
            >
              {card.subtitle && (
                <span className='mb-5 block font-mono text-sm text-white/20'>
                  {card.subtitle}
                </span>
              )}
              <h3 className='mb-3'>{card.title}</h3>
              {card.description && <p>{card.description}</p>}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
