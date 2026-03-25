import type { Metadata } from 'next';
import Link from 'next/link';
import { FadeIn } from '@/components/motion/FadeIn';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;

  const title = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <main className="bg-bg-primary py-section px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <Link href="/resources/events" className="text-accent-blue text-sm hover:underline">
            ← Back to Events
          </Link>
          <h1 className="text-h1 text-text-primary mt-6 font-bold tracking-tight">{title}</h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="glass mt-8 rounded-2xl p-8">
            <p className="text-text-secondary">
              Event details will be loaded from Sanity CMS. Configure your Sanity project to see
              live event content including dates, location, description, and links.
            </p>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
