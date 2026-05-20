import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

type Cta = {
  label: string;
  href: string;
};

type Props = {
  eyebrow?: string;
  heading: string;
  headingDim?: string;
  headingSuffix?: string;
  description?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  backgroundImage?: string;
};

export default function Hero({
  eyebrow,
  heading,
  headingDim,
  headingSuffix,
  description,
  primaryCta,
  secondaryCta,
  backgroundImage,
}: Props) {
  return (
    <section className='relative flex w-full flex-col items-center overflow-hidden py-32 text-center sm:py-40'>
      {backgroundImage && (
        <>
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          />
          <div className='absolute inset-0 bg-black/60' />
        </>
      )}
      <Container className='relative'>
        <div className='mx-auto flex flex-col items-center'>
          {eyebrow && (
            <p className='mb-5 text-xs font-medium tracking-widest text-white/35 uppercase'>
              {eyebrow}
            </p>
          )}

          <h1 className='mb-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl sm:leading-tight'>
            {heading}
            {headingDim && (
              <span className='text-white/50'> {headingDim} </span>
            )}
            {headingSuffix}
          </h1>

          {description && (
            <p className='mb-10 max-w-xl text-base leading-relaxed text-white/45'>
              {description}
            </p>
          )}

          {(primaryCta || secondaryCta) && (
            <div className='flex flex-col items-center gap-3 sm:flex-row'>
              {primaryCta && (
                <Button href={primaryCta.href} variant='primary'>
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant='secondary'>
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
