import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { CTABanner } from '@/components/sections/CTABanner';
import { ComplianceBadges } from '@/components/sections/ComplianceBadges';
import { FadeIn } from '@/components/motion/FadeIn';

export const metadata: Metadata = {
  title: 'Restaurant Voice AI',
  description:
    'Restaurants with Voicify AI experience a 2-3x increase in answered calls, translating to more orders, reservations, and business growth.',
};

const features = [
  {
    icon: 'Phone',
    title: 'Answer Every Call',
    description:
      'Restaurants with Voicify AI experience a 2-3x increase in answered calls. Never miss an order or reservation again.',
  },
  {
    icon: 'ShoppingCart',
    title: 'Voice AI Ordering',
    description:
      'Take complex orders with modifiers and customizations accurately. Phone, kiosk, and drive-thru ordering in one system.',
  },
  {
    icon: 'Calendar',
    title: 'Voice AI Reservations',
    description:
      'Automated 24/7 reservation management. Book, modify, and confirm tables without staff intervention.',
  },
  {
    icon: 'HelpCircle',
    title: 'Voice AI Answering',
    description:
      'Handle common inquiries about hours, location, menu, and specials. Free your staff for in-person hospitality.',
  },
  {
    icon: 'BarChart',
    title: 'Analytics & Insights',
    description:
      'Understand call volumes, popular menu items, peak times, and missed opportunities with detailed reporting.',
  },
  {
    icon: 'Plug',
    title: 'POS Integration',
    description:
      'Direct integration with major POS systems. Orders flow seamlessly from phone to kitchen.',
  },
];

export default function RestaurantsPage() {
  return (
    <main>
      <Hero
        heading="Voice AI Built for Restaurants"
        subheading="2-3x increase in answered calls — more orders, more reservations, more growth"
        ctaText="Schedule a Meeting"
        ctaLink="/schedule"
        variant="industry"
      />

      <section className="bg-bg-primary py-section px-6">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="text-h2 text-text-primary mb-12 text-center font-bold tracking-tight">
              The Complete Voice AI Solution for Restaurants
            </h2>
          </FadeIn>
          <FeatureGrid features={features} columns={3} />
        </div>
      </section>

      <section className="bg-bg-secondary px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <ComplianceBadges />
        </div>
      </section>

      <CTABanner
        heading="Ready to grow your restaurant?"
        buttonText="Schedule a Meeting"
        buttonLink="/schedule"
      />
    </main>
  );
}
