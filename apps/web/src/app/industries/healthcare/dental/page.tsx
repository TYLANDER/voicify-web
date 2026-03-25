import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { ValueProp } from '@/components/sections/ValueProp';
import { CTABanner } from '@/components/sections/CTABanner';
import { ComplianceBadges } from '@/components/sections/ComplianceBadges';
import { FadeIn } from '@/components/motion/FadeIn';

export const metadata: Metadata = {
  title: 'Dental Voice AI',
  description:
    'The Leading Voice AI Receptionist for Dental Practices. Answer every patient, every time they call.',
};

const valueProps = [
  {
    icon: 'Phone',
    title: 'Answer every patient, every time they call',
    description:
      'Voicify AI answers 100% of patient calls without disrupting face-to-face patient care. Your staff stays focused on the patients in front of them.',
  },
  {
    icon: 'Calendar',
    title: 'Make accessing dental care less painful',
    description:
      'Simplify appointment booking, creation, and rescheduling. 24/7 availability with intelligent scheduling that understands your practice.',
  },
  {
    icon: 'Shield',
    title: 'Takes patient security seriously',
    description:
      'HIPAA compliant cloud-based encryption ensures patient information stays secure. SOC 2, PCI, and ISO 27001 certified.',
  },
];

const features = [
  {
    icon: 'Bell',
    title: 'Automated Appointment Reminders',
    description: 'Voice and text reminders reduce no-shows and keep your schedule full.',
  },
  {
    icon: 'UserCheck',
    title: 'Returning Patient Recognition',
    description:
      'AI recognizes returning patients and personalizes the conversation based on their history.',
  },
  {
    icon: 'MessageSquare',
    title: 'Complex Conversation Handling',
    description:
      'On-the-fly modifications, multi-step scheduling, and nuanced patient interactions.',
  },
  {
    icon: 'Plug',
    title: 'Practice Management Integration',
    description:
      'Seamless integration with your existing practice management systems. No workflow disruption.',
  },
];

export default function DentalPage() {
  return (
    <main>
      <Hero
        heading="The Leading Voice AI Receptionist for Dental Practices"
        subheading="Answer every patient, every time they call — without disrupting face-to-face care"
        ctaText="Schedule a Meeting"
        ctaLink="/schedule"
        variant="industry"
      />

      <section className="bg-bg-secondary py-section px-6">
        <div className="mx-auto max-w-7xl space-y-20">
          {valueProps.map((prop, i) => (
            <ValueProp
              key={prop.title}
              icon={prop.icon}
              title={prop.title}
              description={prop.description}
              reversed={i % 2 === 1}
            />
          ))}
        </div>
      </section>

      <section className="bg-bg-primary py-section px-6">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="text-h2 text-text-primary mb-12 text-center font-bold tracking-tight">
              Key Capabilities
            </h2>
          </FadeIn>
          <FeatureGrid features={features} columns={2} />
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
        heading="Ready to modernize your dental practice?"
        buttonText="Schedule a Meeting"
        buttonLink="/schedule"
      />
    </main>
  );
}
