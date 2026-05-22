import CardGrid from '@/components/sections/CardGrid';
import Hero from '@/components/sections/Hero';
import VibeTags from '@/components/sections/VibeTags';
import { heroContent, howItWorksContent, vibeTagsContent } from '@/data/home';

export default function Home() {
  return (
    <main className='flex flex-1 flex-col'>
      <Hero
        eyebrow={heroContent.eyebrow}
        heading={heroContent.heading}
        headingDim={heroContent.headingDim}
        headingSuffix={heroContent.headingSuffix}
        description={heroContent.description}
        primaryCta={heroContent.primaryCta}
        secondaryCta={heroContent.secondaryCta}
        backgroundImage='/images/hero-background.jpg'
      />
      <CardGrid
        eyebrow={howItWorksContent.eyebrow}
        heading={howItWorksContent.heading}
        cards={howItWorksContent.cards}
      />
      <VibeTags
        eyebrow={vibeTagsContent.eyebrow}
        heading={vibeTagsContent.heading}
        description={vibeTagsContent.description}
        rows={vibeTagsContent.rows}
      />
    </main>
  );
}
