'use client';

import { useState } from 'react';
import Link from 'next/link';
import CloseIcon from '@/components/icons/CloseIcon';
import HamburgerIcon from '@/components/icons/HamburgerIcon';
import Logo from '@/components/layout/Logo';
import { headerContent, navLinks } from '@/data/header';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { loginLabel, openMenuLabel, closeMenuLabel } = headerContent;

  return (
    <header className='sticky top-0 z-50 border-b border-white/8 bg-[#0a0a0a]/95 backdrop-blur-sm'>
      <div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-4'>
        <Logo />

        <nav className='hidden items-center gap-8 md:flex'>
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className='text-sm text-white/50 transition-colors duration-200 hover:text-white/90'
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          type='button'
          className='hidden rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/60 transition-colors duration-200 hover:border-white/35 hover:text-white/90 md:block'
        >
          {loginLabel}
        </button>

        <button
          type='button'
          aria-label={menuOpen ? closeMenuLabel : openMenuLabel}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className='flex size-8 items-center justify-center text-white/60 transition-colors hover:text-white/90 md:hidden'
        >
          {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      {menuOpen && (
        <div className='border-t border-white/8 px-6 pb-6 pt-4 md:hidden'>
          <nav className='flex flex-col gap-1'>
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className='py-2.5 text-sm text-white/50 transition-colors duration-200 hover:text-white/90'
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className='mt-4 border-t border-white/8 pt-4'>
            <button
              type='button'
              className='rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/60 transition-colors duration-200 hover:border-white/35 hover:text-white/90'
            >
              {loginLabel}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
