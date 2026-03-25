'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navigation } from '@/lib/constants';
import { MobileNav } from './MobileNav';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 right-0 left-0 z-50 transition-all',
          isScrolled
            ? 'bg-bg-secondary/95 py-3 backdrop-blur-xl'
            : 'bg-bg-primary/80 py-5 backdrop-blur-md'
        )}
        style={{
          borderBottom: isScrolled
            ? '1px solid var(--color-border-subtle)'
            : '1px solid transparent',
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="gradient-text text-2xl font-bold tracking-tight">Voicify</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex" role="navigation">
            {navigation.main.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  className={cn(
                    'flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] font-medium transition-colors',
                    'text-text-secondary hover:text-text-primary'
                  )}
                  aria-expanded={openDropdown === item.label}
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      'h-3.5 w-3.5 transition-transform',
                      openDropdown === item.label && 'rotate-180'
                    )}
                  />
                </button>

                {/* Dropdown — invisible bridge (pt-3) closes the gap so hover doesn't break */}
                {openDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-3">
                    <div className="glass min-w-[220px] rounded-xl p-2 shadow-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'block rounded-lg px-4 py-2.5 text-sm transition-colors',
                            'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href={navigation.cta.href}
              className={cn(
                'hidden rounded-full px-6 py-2.5 text-[15px] font-semibold transition-all lg:inline-flex',
                'bg-accent-blue glow-blue hover:bg-accent-blue/90 text-white'
              )}
            >
              {navigation.cta.label}
            </Link>

            <button
              type="button"
              className="text-text-secondary hover:text-text-primary lg:hidden"
              onClick={toggleMobile}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isMobileOpen} onClose={closeMobile} />
    </>
  );
}
