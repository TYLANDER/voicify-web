import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface HeroProps {
  heading: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
  variant?: 'default' | 'product' | 'industry';
  imageSrc?: string;
  imageAlt?: string;
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

export function Hero({
  heading,
  subheading,
  ctaText,
  ctaLink,
  variant = 'default',
  imageSrc,
  imageAlt,
}: HeroProps) {
  const hasImage = !!imageSrc;

  return (
    <section
      className={cn(
        'relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 py-32 text-center',
        'before:pointer-events-none before:absolute before:inset-0 before:animate-pulse before:[animation-duration:8s]',
        'after:pointer-events-none after:absolute after:inset-0 after:animate-pulse after:[animation-duration:12s]',
        meshStyles[variant]
      )}
    >
      {/* Background image — decorative accent, not full-bleed stretch */}
      {hasImage && (
        <>
          <Image
            src={imageSrc}
            alt={imageAlt ?? ''}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            quality={90}
          />
          {/* Strong dark scrim for text readability over images */}
          <div
            className="from-bg-primary/90 via-bg-primary/75 to-bg-primary/95 absolute inset-0 bg-gradient-to-b"
            aria-hidden="true"
          />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Heading: gradient text on dark bg, solid white + shadow over images */}
        <h1
          className={cn(
            'font-bold tracking-tight',
            hasImage
              ? 'text-text-primary drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]'
              : 'gradient-text-hero'
          )}
          style={{ fontSize: 'var(--text-display)' }}
        >
          {heading}
        </h1>

        {subheading && (
          <p
            className={cn(
              'mx-auto mt-6 max-w-2xl text-lg md:text-xl',
              hasImage
                ? 'text-text-primary/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]'
                : 'text-text-secondary'
            )}
          >
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
