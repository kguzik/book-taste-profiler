import PageHero from '@/components/sections/PageHero';
import TasteProfile from '@/features/taste-profile/TasteProfile';
import { tasteProfileContent } from '@/data/taste-profile';

export default function TasteProfilePage() {
  const { hero } = tasteProfileContent;
  return (
    <main className='flex flex-1 flex-col bg-black/90'>
      <PageHero
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        description={hero.description}
      />
      <TasteProfile />
    </main>
  );
}
