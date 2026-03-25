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
  const data = await sanityFetch<IndustryPage>(industryPageQuery, { slug: 'healthcare/medical' });
  return {
    title: data?.seo?.metaTitle ?? 'Medical Voice AI',
    description:
      data?.seo?.metaDescription ??
      'Voice AI solutions for medical practices. Automate patient communication, scheduling, and support while maintaining HIPAA compliance.',
  };
}

const features = [
  {
    icon: 'Phone',
    title: 'Patient Call Management',
    description:
      'AI handles appointment scheduling, prescription refill requests, and general inquiries — allowing staff to focus on patient care.',
  },
  {
    icon: 'Calendar',
    title: 'Intelligent Scheduling',
    description:
      'Smart appointment booking that understands provider availability, visit types, and patient preferences.',
  },
  {
    icon: 'Bell',
    title: 'Automated Reminders',
    description:
      'Reduce no-shows with automated appointment reminders via voice call and text message.',
  },
  {
    icon: 'Shield',
    title: 'HIPAA Compliant',
    description:
      'Enterprise-grade security with HIPAA compliant cloud encryption. Patient data is always protected.',
  },
  {
    icon: 'UserCheck',
    title: 'Patient Recognition',
    description:
      'AI recognizes returning patients and provides personalized assistance based on their profile.',
  },
  {
    icon: 'Plug',
    title: 'EHR Integration',
    description:
      'Seamless integration with Electronic Health Record systems and practice management software.',
  },
];

export default async function MedicalPage() {
  const data = await sanityFetch<IndustryPage>(industryPageQuery, { slug: 'healthcare/medical' });

  const resolvedFeatures = data?.solutions ?? features;

  return (
    <main>
      <Hero
        heading={data?.hero?.heading ?? 'Voice AI for Medical Practices'}
        subheading={
          data?.hero?.subheading ??
          'Automate patient communication while maintaining the highest security standards'
        }
        ctaText={data?.hero?.ctaText ?? 'Schedule a Meeting'}
        ctaLink={data?.hero?.ctaLink ?? '/schedule'}
        variant="industry"
      />

      <section className="bg-bg-primary py-section px-6">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="text-h2 text-text-primary mb-12 text-center font-bold tracking-tight">
              Built for Healthcare
            </h2>
          </FadeIn>
          <FeatureGrid features={resolvedFeatures} columns={3} />
        </div>
      </section>

      <section className="bg-bg-secondary px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <p className="text-text-muted mb-8 text-center text-sm font-medium tracking-widest uppercase">
              Security & HIPAA Compliance
            </p>
          </FadeIn>
          <ComplianceBadges />
        </div>
      </section>

      <CTABanner
        heading="Ready to modernize your medical practice?"
        buttonText="Schedule a Meeting"
        buttonLink="/schedule"
      />
    </main>
  );
}
