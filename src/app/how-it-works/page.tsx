import PageHero from '@/components/sections/PageHero';
import CardGrid from '@/components/sections/CardGrid';
import { howItWorksContent } from '@/data/home';

export default function HowItWorksPage() {
  return (
    <main className='flex flex-1 flex-col bg-black/90'>
      <PageHero
        eyebrow={howItWorksContent.eyebrow}
        heading={howItWorksContent.heading}
      />
      <CardGrid cards={howItWorksContent.cards} />
    </main>
  );
}
