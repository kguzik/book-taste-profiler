import Link from 'next/link';
import { headerContent } from '@/data/header';

export default function Logo() {
  const { logoText, logoDimText } = headerContent;

  return (
    <Link
      href='/'
      className='text-sm font-medium tracking-widest text-white uppercase'
    >
      {logoText} <span className='text-white/35'>{logoDimText}</span>
    </Link>
  );
}
