import Link from 'next/link';
import { Hero } from '@/components/sections/Hero';
import { IndustryCard } from '@/components/sections/IndustryCard';
import { CTABanner } from '@/components/sections/CTABanner';
import { ComplianceBadges } from '@/components/sections/ComplianceBadges';
import { FadeIn } from '@/components/motion/FadeIn';
import { StaggerChildren } from '@/components/motion/StaggerChildren';

const industries = [
  {
    title: 'Restaurants',
    href: '/industries/restaurants',
    imageAlt: 'Restaurant Voice AI',
  },
  {
    title: 'Dental',
    href: '/industries/healthcare/dental',
    imageAlt: 'Dental Voice AI',
  },
  {
    title: 'Hotels',
    href: '/industries/hotels',
    imageAlt: 'Hotel Voice AI',
  },
  {
    title: 'Medical',
    href: '/industries/healthcare/medical',
    imageAlt: 'Medical Voice AI',
  },
  {
    title: 'Automotive',
    href: '/industries/automotive',
    imageAlt: 'Automotive Voice AI',
  },
];

export default function HomePage() {
  return (
    <main>
      <Hero
        heading="It's time we reimagine the phone call"
        subheading="See & hear how Voicify works"
        ctaText="Schedule a Meeting"
        ctaLink="/schedule"
        variant="default"
        imageSrc="/images/homepage-hero.jpg"
        imageAlt="Voicify Voice AI Platform"
      />

      {/* Industry Showcase */}
      <section className="bg-bg-primary py-section px-6">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="text-h2 text-text-primary mb-12 text-center font-bold tracking-tight">
              Voice AI for Every Industry
            </h2>
          </FadeIn>

          <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {industries.map((industry) => (
              <IndustryCard
                key={industry.href}
                title={industry.title}
                href={industry.href}
                imageAlt={industry.imageAlt}
              />
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="bg-bg-secondary px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <p className="text-text-muted mb-8 text-center text-sm font-medium tracking-widest uppercase">
              Enterprise-Grade Security & Compliance
            </p>
          </FadeIn>
          <ComplianceBadges />
        </div>
      </section>

      {/* CTA */}
      <CTABanner heading="Let's talk." buttonText="Schedule a Meeting" buttonLink="/schedule" />
    </main>
  );
}
