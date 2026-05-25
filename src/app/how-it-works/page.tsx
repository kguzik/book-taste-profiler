import PageHero from '@/components/sections/PageHero';
import { howItWorksContent } from '@/data/how-it-works';

export default function HowItWorksPage() {
  return (
    <main className='flex flex-1 flex-col bg-black/90'>
      <PageHero
        eyebrow={howItWorksContent.eyebrow}
        heading={howItWorksContent.heading}
      />
    </main>
  );
}
