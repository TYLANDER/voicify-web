import { cn } from '@/lib/utils';
import { complianceBadges } from '@/lib/constants';
import { DynamicIcon } from './DynamicIcon';

interface Badge {
  name: string;
  icon: string;
}

interface ComplianceBadgesProps {
  badges?: readonly Badge[] | Badge[];
}

export function ComplianceBadges({ badges = complianceBadges }: ComplianceBadgesProps) {
  return (
    <section className="px-6 py-(--spacing-section)">
      {/* Mobile: horizontal scroll, Desktop: centered grid */}
      <div
        className={cn(
          'mx-auto max-w-4xl',
          'flex gap-4 overflow-x-auto pb-2 md:flex-wrap md:justify-center md:overflow-visible md:pb-0',
          // Hide scrollbar
          '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        )}
      >
        {badges.map((badge) => (
          <div
            key={badge.name}
            className={cn(
              'glass flex shrink-0 items-center gap-2.5 rounded-full px-5 py-2.5',
              'text-text-secondary text-sm font-medium'
            )}
          >
            <DynamicIcon name={badge.icon} className="text-accent-teal" size={18} />
            <span>{badge.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
