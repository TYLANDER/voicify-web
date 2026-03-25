import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { CTABanner } from '@/components/sections/CTABanner';
import { ComplianceBadges } from '@/components/sections/ComplianceBadges';
import { FadeIn } from '@/components/motion/FadeIn';

export const metadata: Metadata = {
  title: 'Medical Voice AI',
  description:
    'Voice AI solutions for medical practices. Automate patient communication, scheduling, and support while maintaining HIPAA compliance.',
};

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

export default function MedicalPage() {
  return (
    <main>
      <Hero
        heading="Voice AI for Medical Practices"
        subheading="Automate patient communication while maintaining the highest security standards"
        ctaText="Schedule a Meeting"
        ctaLink="/schedule"
        variant="industry"
      />

      <section className="bg-bg-primary py-section px-6">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="text-h2 text-text-primary mb-12 text-center font-bold tracking-tight">
              Built for Healthcare
            </h2>
          </FadeIn>
          <FeatureGrid features={features} columns={3} />
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
