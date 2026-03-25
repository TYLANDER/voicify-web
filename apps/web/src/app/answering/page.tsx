import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { ValueProp } from '@/components/sections/ValueProp';
import { VideoEmbed } from '@/components/sections/VideoEmbed';
import { CTABanner } from '@/components/sections/CTABanner';
import { FadeIn } from '@/components/motion/FadeIn';
import { sanityFetch } from '@/lib/sanity/fetch';
import { productPageQuery } from '@/lib/sanity/queries';
import type { ProductPage } from '@/lib/sanity/types';

export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityFetch<ProductPage>(productPageQuery, { slug: 'answering' });
  return {
    title: data?.seo?.metaTitle ?? 'Voice AI Answering',
    description:
      data?.seo?.metaDescription ??
      'Give every caller a friendly welcome with Voicify AI Answering. Automated voice and SMS guest service that never misses a call.',
  };
}

const fallbackValueProps = [
  {
    icon: 'Phone',
    title: 'Answer. Always.',
    description:
      'Immediate responses with optional human escalation. Never miss a call, never lose a customer.',
  },
  {
    icon: 'Users',
    title: 'Raise the bar on service',
    description:
      'Voice and SMS guest service automation without more headcount. Free your human staff for higher-value tasks.',
  },
  {
    icon: 'TrendingUp',
    title: 'Improve conversion rates',
    description:
      'Prompt responses drive more conversions. Provide links to directions, menus, and ordering instantly.',
  },
];

const fallbackFeatures = [
  {
    icon: 'Brain',
    title: 'Natural Language Understanding',
    description:
      'Advanced AI understands context, handles general inquiries about hours, directions, and more.',
  },
  {
    icon: 'Zap',
    title: 'Up and running in days',
    description:
      'Quick deployment with no complex setup. Start answering calls with AI in days, not months.',
  },
  {
    icon: 'Code',
    title: 'No programmers required',
    description:
      'Configure and manage your AI assistant without any technical expertise. Simple, intuitive controls.',
  },
  {
    icon: 'Scale',
    title: 'Scale to your Knowledge Base',
    description:
      'The AI grows with your business. Add new topics, FAQs, and capabilities as your needs evolve.',
  },
];

export default async function AnsweringPage() {
  const data = await sanityFetch<ProductPage>(productPageQuery, { slug: 'answering' });

  const heroHeading =
    data?.hero?.heading ?? 'Give Every Caller a Friendly Welcome with Voicify AI Answering';
  const heroSubheading =
    data?.hero?.subheading ?? 'Raise the bar on service, without more headcount';
  const heroCtaText = data?.hero?.ctaText ?? 'Schedule a Meeting';
  const heroCtaLink = data?.hero?.ctaLink ?? '/schedule';
  const valueProps = data?.valueProps ?? fallbackValueProps;
  const features = data?.features ?? fallbackFeatures;

  return (
    <main>
      <Hero
        heading={heroHeading}
        subheading={heroSubheading}
        ctaText={heroCtaText}
        ctaLink={heroCtaLink}
        variant="product"
      />

      {/* Video Demo */}
      <section className="bg-bg-primary py-section px-6">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <h2 className="text-h2 text-text-primary mb-8 text-center font-bold tracking-tight">
              Watch it in Action
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <VideoEmbed
              url={data?.videoEmbed?.url ?? ''}
              title={data?.videoEmbed?.title ?? 'Voicify AI Answering Demo'}
            />
          </FadeIn>
        </div>
      </section>

      {/* Value Propositions */}
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

      {/* Features */}
      <section className="bg-bg-primary py-section px-6">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="text-h2 text-text-primary mb-12 text-center font-bold tracking-tight">
              Built on a Solid Foundation
            </h2>
          </FadeIn>
          <FeatureGrid features={features} columns={2} />
        </div>
      </section>

      {/* Related Solutions */}
      <section className="bg-bg-secondary py-section px-6">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="text-h2 text-text-primary mb-8 text-center font-bold tracking-tight">
              Related Solutions
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <a
              href="/ordering"
              className="glass hover:border-border-hover hover:glow-blue rounded-xl p-6 transition-all"
            >
              <h3 className="text-h3 text-text-primary font-semibold">Voice AI Ordering</h3>
              <p className="text-text-secondary mt-2">
                Restaurant voice AI ordering that simply works.
              </p>
            </a>
            <a
              href="/reservations"
              className="glass hover:border-border-hover hover:glow-blue rounded-xl p-6 transition-all"
            >
              <h3 className="text-h3 text-text-primary font-semibold">Voice AI Reservations</h3>
              <p className="text-text-secondary mt-2">
                Courteous, self-service table reservations that never sleep.
              </p>
            </a>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Ready to transform your phone experience?"
        buttonText="Schedule a Meeting"
        buttonLink="/schedule"
      />
    </main>
  );
}
