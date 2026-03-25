import Link from 'next/link';
import { Shield, CreditCard, Lock, HeartPulse } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig, navigation, complianceBadges } from '@/lib/constants';

const badgeIcons: Record<string, typeof Shield> = {
  Shield,
  CreditCard,
  Lock,
  HeartPulse,
};

export function Footer() {
  return (
    <footer className="bg-bg-secondary" role="contentinfo">
      {/* Compliance badges */}
      <div className="border-border-subtle border-b">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-6 py-8">
          {complianceBadges.map((badge) => {
            const Icon = badgeIcons[badge.icon];
            return (
              <div
                key={badge.name}
                className={cn(
                  'glass flex items-center gap-2 rounded-full px-4 py-2 text-sm',
                  'text-text-secondary'
                )}
              >
                {Icon && <Icon className="text-accent-blue h-4 w-4" />}
                <span>{badge.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer columns */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {navigation.footer.columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-text-primary mb-4 text-sm font-semibold tracking-wider uppercase">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-text-muted hover:text-text-secondary text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Company info */}
        <div className="border-border-subtle mt-12 border-t pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="space-y-2">
              <Link href="/" className="inline-block">
                <span className="gradient-text text-lg font-bold tracking-tight">Voicify</span>
              </Link>
              <p className="text-text-muted text-sm">{siteConfig.company.address}</p>
              <p className="text-text-muted text-sm">
                <a
                  href={`tel:${siteConfig.company.phone}`}
                  className="hover:text-text-secondary transition-colors"
                >
                  {siteConfig.company.phone}
                </a>
                {' | '}
                <a
                  href={`mailto:${siteConfig.company.email}`}
                  className="hover:text-text-secondary transition-colors"
                >
                  {siteConfig.company.email}
                </a>
              </p>
            </div>

            <div className="text-right">
              <p className="text-text-muted text-sm">
                &copy; {new Date().getFullYear()} {siteConfig.company.name}. All rights reserved.
              </p>
              {siteConfig.trademarks.map((tm) => (
                <p key={tm} className="text-text-muted/60 text-xs">
                  {tm}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
