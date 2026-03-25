import { cn } from '@/lib/utils';
import { DynamicIcon } from './DynamicIcon';

interface Feature {
  icon?: string;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
}

const columnClasses: Record<number, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
};

export function FeatureGrid({ features, columns = 3 }: FeatureGridProps) {
  return (
    <section className="px-6 py-(--spacing-section)">
      <div className={cn('mx-auto grid max-w-7xl gap-6', columnClasses[columns])}>
        {features.map((feature) => (
          <div
            key={feature.title}
            className={cn(
              'glass group rounded-xl p-6 transition-all duration-300',
              'hover:border-border-hover hover:glow-blue'
            )}
          >
            {feature.icon && (
              <div className="mb-4">
                <DynamicIcon name={feature.icon} className="text-accent-blue" size={28} />
              </div>
            )}
            <h3 className="text-text-primary mb-2 text-lg font-semibold">{feature.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
