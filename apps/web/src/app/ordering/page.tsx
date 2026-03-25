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
  const data = await sanityFetch<ProductPage>(productPageQuery, { slug: 'ordering' });
  return {
    title: data?.seo?.metaTitle ?? 'Voice AI Ordering',
    description:
      data?.seo?.metaDescription ??
      'Restaurant Voice AI Ordering that simply works. Take complex orders with modifiers and changes accurately every time.',
  };
}

const fallbackValueProps = [
  {
    icon: 'ShoppingCart',
    title: 'Take complex orders with modifiers and changes',
    description:
      'AI handles complicated customizations without errors. Modifiers, substitutions, and special requests — all handled accurately.',
  },
  {
    icon: 'RefreshCw',
    title: 'Easy menu and pricing updates',
    description:
      'Update your menu and pricing across all ordering channels instantly. No more outdated menus or incorrect prices.',
  },
  {
    icon: 'Target',
    title: 'Efficiency with a Side of Accuracy',
    description:
      'Our continuous learning system improves with every order. Multi-channel ordering across phone, kiosk, and drive-thru.',
  },
];

const fallbackFeatures = [
  {
    icon: 'MessageSquare',
    title: 'Natural Conversation',
    description:
      'Customers order naturally, just like talking to a human. The AI understands context and follows conversation flow.',
  },
  {
    icon: 'Smartphone',
    title: 'Multi-Channel',
    description:
      'Phone, kiosk, and drive-thru — one AI brain handles them all with consistent accuracy.',
  },
  {
    icon: 'Bell',
    title: 'Automatic Status Updates',
    description:
      'Customers receive automatic order status updates via text or speech. No more "where is my order?" calls.',
  },
  {
    icon: 'BarChart',
    title: 'Analytics & Insights',
    description:
      'Track ordering patterns, popular items, peak times, and customer preferences with detailed analytics.',
  },
];

export default async function OrderingPage() {
  const data = await sanityFetch<ProductPage>(productPageQuery, { slug: 'ordering' });

  const heroHeading = data?.hero?.heading ?? 'Restaurant Voice AI Ordering That Simply Works';
  const heroSubheading =
    data?.hero?.subheading ??
    'Take complex orders with modifiers and changes — accurately, every time';
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

      <section className="bg-bg-primary py-section px-6">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <h2 className="text-h2 text-text-primary mb-8 text-center font-bold tracking-tight">
              See it in Action
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <VideoEmbed
              url={data?.videoEmbed?.url ?? ''}
              title={data?.videoEmbed?.title ?? 'Voicify AI Ordering Demo'}
            />
          </FadeIn>
        </div>
      </section>

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
              Why Voice AI Ordering?
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
              <h3 className="text-h3 text-text-primary font-semibold">Voice AI Answering</h3>
              <p className="text-text-secondary mt-2">
                Give every caller a friendly welcome with AI answering.
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
        heading="Ready to streamline your ordering?"
        buttonText="Schedule a Meeting"
        buttonLink="/schedule"
      />
    </main>
  );
}
