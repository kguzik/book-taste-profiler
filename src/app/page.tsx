import Hero from '@/features/home/Hero';
import { heroContent } from '@/data/home';

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
    </main>
  );
}
