'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Partner {
  name: string;
  logo?: string;
  quote?: string;
  quoteAuthor?: string;
  category: string;
}

interface PartnerShowcaseProps {
  partners: Partner[];
}

export function PartnerShowcase({ partners }: PartnerShowcaseProps) {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(partners.map((p) => p.category)));
    return unique.sort();
  }, [partners]);

  const hasMultipleCategories = categories.length > 1;

  const [activeCategory, setActiveCategory] = useState<string | null>(
    hasMultipleCategories ? null : null
  );

  const filteredPartners = activeCategory
    ? partners.filter((p) => p.category === activeCategory)
    : partners;

  return (
    <section className="px-6 py-(--spacing-section)">
      <div className="mx-auto max-w-7xl">
        {/* Category filter tabs */}
        {hasMultipleCategories && (
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-medium transition-all duration-200',
                activeCategory === null
                  ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white'
                  : 'glass text-text-secondary hover:text-text-primary'
              )}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'rounded-full px-5 py-2 text-sm font-medium transition-all duration-200',
                  activeCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white'
                    : 'glass text-text-secondary hover:text-text-primary'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Partner grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPartners.map((partner) => (
            <div key={partner.name} className="glass flex flex-col rounded-xl p-6">
              {/* Logo area */}
              <div className="mb-4 flex h-16 items-center">
                {partner.logo ? (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={48}
                    className="h-10 w-auto object-contain"
                  />
                ) : (
                  <div className="bg-bg-tertiary flex h-10 items-center rounded-lg px-4">
                    <span className="text-text-muted text-sm font-medium">{partner.name}</span>
                  </div>
                )}
              </div>

              {/* Partner name */}
              <h3 className="text-text-primary text-base font-semibold">{partner.name}</h3>

              {/* Optional quote */}
              {partner.quote && (
                <blockquote className="border-accent-blue/30 text-text-secondary mt-3 flex-1 border-l-2 pl-4 text-sm leading-relaxed italic">
                  &ldquo;{partner.quote}&rdquo;
                  {partner.quoteAuthor && (
                    <footer className="text-text-muted mt-2 not-italic">
                      &mdash; {partner.quoteAuthor}
                    </footer>
                  )}
                </blockquote>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
