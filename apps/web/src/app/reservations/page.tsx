import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { CTABanner } from '@/components/sections/CTABanner';
import { FadeIn } from '@/components/motion/FadeIn';

export const metadata: Metadata = {
  title: 'Voice AI Reservations',
  description:
    'Provide courteous, self-service table reservations that never sleep. 24/7 availability with seamless scheduling.',
};

const features = [
  {
    icon: 'Clock',
    title: '24/7 Availability',
    description:
      'Round-the-clock reservation acceptance. Never miss a booking, even after hours or during peak times.',
  },
  {
    icon: 'Calendar',
    title: 'Effortless Scheduling',
    description:
      'Seamless integration with your existing reservation software. Guests book, modify, or cancel with a simple call.',
  },
  {
    icon: 'Settings',
    title: 'Optimized Operations',
    description:
      'Intelligent table balancing and staff efficiency. Maximize seating while maintaining a great guest experience.',
  },
  {
    icon: 'Bell',
    title: 'Automate Guest Updates',
    description:
      'Automated confirmation and reminder notifications delivered via voice or text. Reduce no-shows effortlessly.',
  },
];

export default function ReservationsPage() {
  return (
    <main>
      <Hero
        heading="Provide courteous, self-service table reservations that never sleep"
        subheading="24/7 availability with intelligent scheduling and guest communication"
        ctaText="Book a Demo"
        ctaLink="/schedule"
        variant="product"
      />

      <section className="bg-bg-primary py-section px-6">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="text-h2 text-text-primary mb-12 text-center font-bold tracking-tight">
              Why Voice AI Reservations?
            </h2>
          </FadeIn>
          <FeatureGrid features={features} columns={2} />
        </div>
      </section>

      <section className="bg-bg-secondary py-section px-6">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="text-h2 text-text-primary mb-8 text-center font-bold tracking-tight">
              Related Solutions
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <a
              href="/answering"
              className="glass hover:border-border-hover hover:glow-blue rounded-xl p-6 transition-all"
            >
              <h3 className="text-h3 text-text-primary font-semibold">
                Restaurant Voice AI Answering
              </h3>
              <p className="text-text-secondary mt-2">
                Give every caller a friendly welcome with AI answering.
              </p>
            </a>
            <a
              href="/ordering"
              className="glass hover:border-border-hover hover:glow-blue rounded-xl p-6 transition-all"
            >
              <h3 className="text-h3 text-text-primary font-semibold">
                Restaurant Voice AI Ordering
              </h3>
              <p className="text-text-secondary mt-2">
                AI ordering that handles complex modifications accurately.
              </p>
            </a>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Ready to automate your reservations?"
        buttonText="Schedule a Meeting"
        buttonLink="/schedule"
      />
    </main>
  );
}
