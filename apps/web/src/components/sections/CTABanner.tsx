import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CTABannerProps {
  heading: string;
  buttonText: string;
  buttonLink: string;
  variant?: 'primary' | 'subtle';
}

export function CTABanner({
  heading,
  buttonText,
  buttonLink,
  variant = 'primary',
}: CTABannerProps) {
  return (
    <section className="px-6 py-(--spacing-section)">
      <div
        className={cn(
          'mx-auto max-w-4xl rounded-2xl px-8 py-16 text-center md:px-16',
          variant === 'primary' && [
            'from-accent-blue/20 via-accent-teal/10 to-accent-blue/20 bg-gradient-to-r',
            'border-border-hover border',
            'glow-blue',
          ],
          variant === 'subtle' && ['glass']
        )}
      >
        <h2
          className="text-text-primary font-bold tracking-tight"
          style={{ fontSize: 'var(--text-h2)' }}
        >
          {heading}
        </h2>

        <div className="mt-8">
          <Link
            href={buttonLink}
            className={cn(
              'inline-flex items-center rounded-full px-8 py-3.5 font-semibold text-white',
              'bg-gradient-to-r from-blue-500 to-teal-500',
              'glow-blue transition-all duration-300',
              'hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:brightness-110',
              'focus-visible:outline-accent-blue focus-visible:outline-2 focus-visible:outline-offset-2'
            )}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
