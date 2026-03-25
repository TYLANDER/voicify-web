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
  const data = await sanityFetch<IndustryPage>(industryPageQuery, { slug: 'hotels' });
  return {
    title: data?.seo?.metaTitle ?? 'Hotels Voice AI',
    description:
      data?.seo?.metaDescription ??
      'The most advanced Voice AI Receptionist for Hotels. Elevate guest experience, streamline operations, and drive new revenue.',
  };
}

const features = [
  {
    icon: 'Bed',
    title: 'Effortless Booking and Reservations',
    description:
      'Guests book rooms, modify stays, and check availability with natural voice commands. Seamless integration with your PMS.',
  },
  {
    icon: 'Clock',
    title: '24/7 Guest Assistance',
    description:
      'Around-the-clock support for guest inquiries. From check-in times to amenity information, AI handles it all.',
  },
  {
    icon: 'ConciergeBell',
    title: 'Service Requests Made Easy',
    description:
      'Housekeeping, room service, and maintenance requests via voice. Faster response times, happier guests.',
  },
  {
    icon: 'Star',
    title: 'Personalized Recommendations',
    description:
      'AI-powered suggestions for dining, activities, and local attractions based on guest preferences.',
  },
  {
    icon: 'Plug',
    title: 'Seamless Integration with Hotel Systems',
    description:
      'Works with your existing PMS, CRM, and communication systems. No disruption to current workflows.',
  },
];

export default async function HotelsPage() {
  const data = await sanityFetch<IndustryPage>(industryPageQuery, { slug: 'hotels' });

  const resolvedFeatures = data?.solutions ?? features;

  return (
    <main>
      <Hero
        heading={data?.hero?.heading ?? 'The most advanced Voice AI Receptionist for Hotels'}
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
              Hotel Voice AI Solutions
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
        heading="Ready to elevate your guest experience?"
        buttonText="Schedule a Meeting"
        buttonLink="/schedule"
      />
    </main>
  );
}
