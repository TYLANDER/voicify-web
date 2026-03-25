import { cn } from '@/lib/utils';
import { DynamicIcon } from './DynamicIcon';

interface ValuePropProps {
  icon?: string;
  title: string;
  description: string;
  reversed?: boolean;
}

export function ValueProp({ icon, title, description, reversed = false }: ValuePropProps) {
  return (
    <section className="px-6 py-(--spacing-section)">
      <div
        className={cn(
          'mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2',
          reversed && 'md:[&>:first-child]:order-2'
        )}
      >
        {/* Content */}
        <div>
          {icon && (
            <div className="mb-6">
              <DynamicIcon name={icon} className="text-accent-blue" size={40} />
            </div>
          )}
          <h2
            className="text-text-primary font-bold tracking-tight"
            style={{ fontSize: 'var(--text-h2)' }}
          >
            {title}
          </h2>
          <p className="text-text-secondary mt-4 text-lg leading-relaxed">{description}</p>
        </div>

        {/* Decorative gradient element */}
        <div
          className={cn(
            'relative aspect-square overflow-hidden rounded-2xl',
            'from-accent-blue/10 via-accent-teal/5 bg-gradient-to-br to-transparent',
            'border-border-subtle border'
          )}
          aria-hidden="true"
        >
          {/* Inner glow orbs */}
          <div className="bg-accent-blue/20 absolute top-1/4 left-1/4 h-32 w-32 rounded-full blur-3xl" />
          <div className="bg-accent-teal/20 absolute right-1/4 bottom-1/4 h-24 w-24 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>
      </div>
    </section>
  );
}
