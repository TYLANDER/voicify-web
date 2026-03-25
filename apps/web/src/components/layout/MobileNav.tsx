'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navigation } from '@/lib/constants';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = useCallback((label: string) => {
    setExpandedSection((prev) => (prev === label ? null : label));
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="bg-bg-primary fixed inset-0 z-40 flex flex-col lg:hidden"
        >
          {/* Close button */}
          <div className="flex justify-end px-6 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation sections */}
          <nav className="flex-1 overflow-y-auto px-6 pt-8" role="navigation">
            {navigation.main.map((item) => (
              <div key={item.label} className="border-border-subtle border-b">
                <button
                  type="button"
                  onClick={() => toggleSection(item.label)}
                  className={cn(
                    'flex w-full items-center justify-between py-4 text-left text-lg font-medium',
                    'text-text-primary'
                  )}
                  aria-expanded={expandedSection === item.label}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      'text-text-muted h-5 w-5 transition-transform',
                      expandedSection === item.label && 'rotate-180'
                    )}
                  />
                </button>

                <AnimatePresence>
                  {expandedSection === item.label && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-1 pb-4 pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onClose}
                            className="text-text-secondary hover:text-text-primary block rounded-lg py-2 text-base transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="px-6 pb-8">
            <Link
              href={navigation.cta.href}
              onClick={onClose}
              className={cn(
                'block w-full rounded-full py-3 text-center text-base font-medium transition-all',
                'bg-accent-blue glow-blue hover:bg-accent-blue/90 text-white'
              )}
            >
              {navigation.cta.label}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
