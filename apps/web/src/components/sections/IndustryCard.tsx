import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface IndustryCardProps {
  title: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function IndustryCard({ title, href, imageSrc, imageAlt }: IndustryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'glass group relative block overflow-hidden rounded-xl',
        'transition-all duration-300',
        'hover:border-border-hover hover:glow-blue hover:scale-[1.02]'
      )}
    >
      {/* Image area */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            className="from-accent-blue/20 via-accent-teal/10 to-bg-tertiary absolute inset-0 bg-gradient-to-br"
            aria-hidden="true"
          />
        )}

        {/* Gradient overlay for text readability */}
        <div
          className="from-bg-primary/90 via-bg-primary/30 absolute inset-0 bg-gradient-to-t to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Title overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="text-text-primary text-lg font-semibold">{title}</h3>
      </div>
    </Link>
  );
}
