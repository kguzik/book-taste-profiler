import Container from '@/components/ui/Container';

type Props = {
  eyebrow?: string;
  heading: string;
  description?: string;
};

export default function PageHero({ eyebrow, heading, description }: Props) {
  return (
    <div className='pt-16 pb-12'>
      <Container>
        {eyebrow && (
          <p className='mb-3 text-xs font-medium tracking-widest text-white/30 uppercase'>
            {eyebrow}
          </p>
        )}
        <h1 className='mb-3'>{heading}</h1>
        {description && <p className='max-w-lg'>{description}</p>}
      </Container>
    </div>
  );
}
