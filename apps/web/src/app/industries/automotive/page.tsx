import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { CTABanner } from '@/components/sections/CTABanner';
import { ComplianceBadges } from '@/components/sections/ComplianceBadges';
import { FadeIn } from '@/components/motion/FadeIn';
import { sanityFetch } from '@/lib/sanity/fetch';
import { industryPageQuery } from '@/lib/sanity/queries';
import type { IndustryPage } from '@/lib/sanity/types';

export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityFetch<IndustryPage>(industryPageQuery, { slug: 'automotive' });
  return {
    title: data?.seo?.metaTitle ?? 'Automotive Voice AI',
    description:
      data?.seo?.metaDescription ??
      'The leading Voice AI Customer Service Agent for the Automotive Industry. Elevate guest experience, streamline operations, and drive new revenue.',
  };
}

const features = [
  {
    icon: 'Calendar',
    title: 'Effortless Appointment Scheduling',
    description:
      'Voice-based booking and modification for service appointments. Customers schedule, reschedule, or cancel without waiting on hold.',
  },
  {
    icon: 'Clock',
    title: '24/7 Customer Support',
    description:
      'Round-the-clock AI assistance for your customers. Answer questions about service hours, pricing, and availability any time.',
  },
  {
    icon: 'Car',
    title: 'Service Status Updates',
    description:
      'Real-time vehicle service progress notifications. Customers get automatic updates when their vehicle is ready.',
  },
  {
    icon: 'CreditCard',
    title: 'Streamlined Payment Processing',
    description:
      'Secure phone-based invoice settlement. Customers can pay for services quickly and securely over the phone.',
  },
  {
    icon: 'Plug',
    title: 'Seamless Integration',
    description:
      'Compatibility with your existing service management systems and CRMs. No rip-and-replace required.',
  },
];

export default async function AutomotivePage() {
  const data = await sanityFetch<IndustryPage>(industryPageQuery, { slug: 'automotive' });

  const resolvedFeatures = data?.solutions ?? features;

  return (
    <main>
      <Hero
        heading={
          data?.hero?.heading ??
          'The leading Voice AI Customer Service Agent for the Automotive Industry'
        }
        subheading={
          data?.hero?.subheading ??
          'Elevate guest experience, streamline operations, & drive new revenue'
        }
        ctaText={data?.hero?.ctaText ?? 'Schedule a Meeting'}
        ctaLink={data?.hero?.ctaLink ?? '/schedule'}
        variant="industry"
      />

      <section className="bg-bg-primary py-section px-6">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="text-h2 text-text-primary mb-12 text-center font-bold tracking-tight">
              Voice AI Solutions for Automotive
            </h2>
          </FadeIn>
          <FeatureGrid features={resolvedFeatures} columns={3} />
        </div>
      </section>

      <section className="bg-bg-secondary px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <ComplianceBadges />
        </div>
      </section>

      <CTABanner
        heading="Ready to transform your dealership experience?"
        buttonText="Schedule a Meeting"
        buttonLink="/schedule"
      />
    </main>
  );
}
