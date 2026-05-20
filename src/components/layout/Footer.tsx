import Container from '@/components/ui/Container';
import Logo from '@/components/layout/Logo';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='mt-auto border-t border-white/8 bg-[#0a0a0a]/95 backdrop-blur-sm'>
      <Container className='flex flex-col items-center justify-between gap-4 py-8 sm:flex-row'>
        <Logo />

        <p className='text-xs text-white/25'>
          &copy; {year} Book Taste Profiler
        </p>
      </Container>
    </footer>
  );
}
