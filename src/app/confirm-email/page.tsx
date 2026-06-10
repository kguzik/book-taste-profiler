import PageHero from '@/components/sections/PageHero';
import { confirmEmailContent } from '@/data/confirm-email';

export default function ConfirmEmailPage() {
  const { eyebrow, heading, description } = confirmEmailContent;
  return (
    <main className='bg-black min-h-screen'>
      <PageHero eyebrow={eyebrow} heading={heading} description={description} />
    </main>
  );
}
