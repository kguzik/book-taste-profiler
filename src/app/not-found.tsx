import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import PageHero from '@/components/sections/PageHero';
import { notFoundContent } from '@/data/home';

export default function NotFound() {
  const { eyebrow, heading, description, ctaLabel, ctaHref } = notFoundContent;

  return (
    <main className='min-h-screen flex items-center justify-center bg-black/90'>
      <div>
        <PageHero
          eyebrow={eyebrow}
          heading={heading}
          description={description}
        />
        <Container>
          <Button href={ctaHref}>{ctaLabel}</Button>
        </Container>
      </div>
    </main>
  );
}
