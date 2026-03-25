import Link from 'next/link';
import { cn } from '@/lib/utils';

interface HeroProps {
  heading: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
  variant?: 'default' | 'product' | 'industry';
}

const meshStyles: Record<HeroProps['variant'] & string, string> = {
  default: [
    'before:bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]',
    'after:bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(20,184,166,0.1),transparent)]',
  ].join(' '),
  product: [
    'before:bg-[radial-gradient(ellipse_70%_50%_at_30%_20%,rgba(59,130,246,0.2),transparent)]',
    'after:bg-[radial-gradient(ellipse_50%_60%_at_70%_80%,rgba(139,92,246,0.12),transparent)]',
  ].join(' '),
  industry: [
    'before:bg-[radial-gradient(ellipse_90%_50%_at_50%_0%,rgba(20,184,166,0.15),transparent)]',
    'after:bg-[radial-gradient(ellipse_60%_40%_at_20%_60%,rgba(59,130,246,0.1),transparent)]',
  ].join(' '),
};

export function Hero({ heading, subheading, ctaText, ctaLink, variant = 'default' }: HeroProps) {
  return (
    <section
      className={cn(
        'relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 py-32 text-center',
        // Gradient mesh layers via pseudo-elements
        'before:pointer-events-none before:absolute before:inset-0 before:animate-pulse before:[animation-duration:8s]',
        'after:pointer-events-none after:absolute after:inset-0 after:animate-pulse after:[animation-duration:12s]',
        meshStyles[variant]
      )}
    >
      <div className="relative z-10 mx-auto max-w-4xl">
        <h1
          className="gradient-text-hero font-bold tracking-tight"
          style={{ fontSize: 'var(--text-display)' }}
        >
          {heading}
        </h1>

        {subheading && (
          <p className="text-text-secondary mx-auto mt-6 max-w-2xl text-lg md:text-xl">
            {subheading}
          </p>
        )}

        {ctaText && ctaLink && (
          <div className="mt-10">
            <Link
              href={ctaLink}
              className={cn(
                'inline-flex items-center rounded-full px-8 py-3.5 font-semibold text-white',
                'bg-gradient-to-r from-blue-500 to-teal-500',
                'glow-blue transition-all duration-300',
                'hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:brightness-110',
                'focus-visible:outline-accent-blue focus-visible:outline-2 focus-visible:outline-offset-2'
              )}
            >
              {ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
