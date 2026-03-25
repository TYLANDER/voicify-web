import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { PartnerShowcase } from '@/components/sections/PartnerShowcase';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { CTABanner } from '@/components/sections/CTABanner';
import { ComplianceBadges } from '@/components/sections/ComplianceBadges';
import { FadeIn } from '@/components/motion/FadeIn';
import { sanityFetch } from '@/lib/sanity/fetch';
import { partnersQuery } from '@/lib/sanity/queries';

export const metadata: Metadata = {
  title: 'Integrations & Partnerships',
  description:
    'Voicify integrates with leading technology and ordering platforms. Better together.',
};

const defaultTechPartners = [
  {
    name: 'Chowly',
    category: 'technology' as const,
    description: 'Order management integration',
    quote:
      'Customers expect consistent experience regardless of how, where, and when they engage with a brand.',
    quoteAuthor: 'Alex Cranfill',
  },
  {
    name: 'PAR',
    category: 'technology' as const,
    description: 'POS system integration for direct order routing',
  },
  {
    name: 'Olo',
    category: 'technology' as const,
    description: 'Digital restaurant service platform',
    quote: 'Expand operational competitive advantage.',
    quoteAuthor: 'Nolan DeCoster',
  },
  {
    name: 'QikServe',
    category: 'technology' as const,
    description: 'Guest convenience and ordering solutions',
    quote: 'Guests expect convenience and consistency across every touchpoint.',
    quoteAuthor: 'Rob Taylor',
  },
];

const defaultRestaurantPartners = [
  { name: 'NORMS Restaurant Group', category: 'restaurant' as const },
  { name: 'Pure Green Franchise', category: 'restaurant' as const },
  { name: "T'so Chinese", category: 'restaurant' as const },
  { name: 'Zaza Cuban Comfort Food', category: 'restaurant' as const },
];

const capabilities = [
  {
    icon: 'RefreshCw',
    title: 'Real-time Order Modifications',
    description: 'Changes sync instantly across all connected systems.',
  },
  {
    icon: 'MapPin',
    title: 'Delivery & Location',
    description: 'Delivery specifics and location handling integrated seamlessly.',
  },
  {
    icon: 'Calendar',
    title: 'Reservation Scheduling',
    description: 'Direct calendar integration for table management.',
  },
  {
    icon: 'UtensilsCrossed',
    title: 'Menu Details & Modifiers',
    description: 'Full menu item details with modification support.',
  },
  {
    icon: 'Award',
    title: 'Loyalty Programs',
    description: 'Connect with existing loyalty program information.',
  },
  {
    icon: 'CreditCard',
    title: 'Payment Processing',
    description: 'Secure payment processing through integrated systems.',
  },
];

export default async function IntegrationsPage() {
  const cmsPartners =
    await sanityFetch<
      {
        name: string;
        category: string;
        description?: string;
        quote?: string;
        quoteAuthor?: string;
      }[]
    >(partnersQuery);

  const techPartners = cmsPartners ? cmsPartners.filter((p) => p.category === 'technology') : null;
  const restaurantPartners = cmsPartners
    ? cmsPartners.filter((p) => p.category === 'restaurant')
    : null;

  return (
    <main>
      <Hero
        heading="Better Together"
        subheading="Voicify integrates with the platforms you already use"
        ctaText="Schedule a Meeting"
        ctaLink="/schedule"
        variant="default"
        imageSrc="/images/integrations-hero.jpg"
        imageAlt="Voicify integrations"
      />

      <section className="bg-bg-primary py-section px-6">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="text-h2 text-text-primary mb-12 text-center font-bold tracking-tight">
              Technology Partners
            </h2>
          </FadeIn>
          <PartnerShowcase
            partners={techPartners && techPartners.length > 0 ? techPartners : defaultTechPartners}
          />
        </div>
      </section>

      <section className="bg-bg-secondary py-section px-6">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="text-h2 text-text-primary mb-12 text-center font-bold tracking-tight">
              Restaurant Partners
            </h2>
          </FadeIn>
          <PartnerShowcase
            partners={
              restaurantPartners && restaurantPartners.length > 0
                ? restaurantPartners
                : defaultRestaurantPartners
            }
          />
        </div>
      </section>

      <section className="bg-bg-primary py-section px-6">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="text-h2 text-text-primary mb-12 text-center font-bold tracking-tight">
              Integration Capabilities
            </h2>
          </FadeIn>
          <FeatureGrid features={capabilities} columns={3} />
        </div>
      </section>

      <section className="bg-bg-secondary px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <ComplianceBadges />
        </div>
      </section>

      <CTABanner
        heading="Ready to integrate Voicify?"
        buttonText="Schedule a Meeting"
        buttonLink="/schedule"
      />
    </main>
  );
}
