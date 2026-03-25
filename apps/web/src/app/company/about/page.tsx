import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { CTABanner } from '@/components/sections/CTABanner';
import { ComplianceBadges } from '@/components/sections/ComplianceBadges';
import { FadeIn } from '@/components/motion/FadeIn';
import { siteConfig } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Voicify is the leader in Voice AI for restaurants, healthcare, hotels, and automotive industries.',
};

export default function AboutPage() {
  return (
    <main>
      <Hero
        heading="About Voicify"
        subheading="Reimagining the phone call with Voice AI"
        variant="default"
        imageSrc="/images/about-hero.jpg"
        imageAlt="About Voicify"
      />

      <section className="bg-bg-primary py-section px-6">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <div className="text-text-secondary space-y-6 text-lg leading-relaxed">
              <p>
                Voicify is the leading Voice AI platform helping businesses across restaurants,
                healthcare, hotels, and automotive industries transform their phone communication.
              </p>
              <p>
                Our Conversation Experience Platform™ and Voice Content Management System™ enable
                businesses to deploy intelligent voice AI agents that answer calls, take orders,
                manage reservations, and handle customer inquiries — 24/7, with natural conversation
                quality.
              </p>
              <p>
                Based in Needham, Massachusetts, Voicify serves businesses nationwide with
                enterprise-grade security including SOC 2, PCI, ISO 27001, and HIPAA compliance.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="glass mt-12 rounded-2xl p-8">
              <h2 className="text-h3 text-text-primary font-semibold">Contact Information</h2>
              <div className="text-text-secondary mt-4 space-y-2">
                <p>{siteConfig.company.address}</p>
                <p>
                  Phone:{' '}
                  <a
                    href={`tel:${siteConfig.company.phone}`}
                    className="text-accent-blue hover:underline"
                  >
                    {siteConfig.company.phone}
                  </a>
                </p>
                <p>
                  Email:{' '}
                  <a
                    href={`mailto:${siteConfig.company.email}`}
                    className="text-accent-blue hover:underline"
                  >
                    {siteConfig.company.email}
                  </a>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-bg-secondary px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <ComplianceBadges />
        </div>
      </section>

      <CTABanner
        heading="Ready to get started?"
        buttonText="Schedule a Meeting"
        buttonLink="/schedule"
      />
    </main>
  );
}
