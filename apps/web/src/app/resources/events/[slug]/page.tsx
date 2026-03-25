import type { Metadata } from 'next';
import Link from 'next/link';
import { FadeIn } from '@/components/motion/FadeIn';
import { sanityFetch } from '@/lib/sanity/fetch';
import { eventDetailQuery } from '@/lib/sanity/queries';
import type { Event } from '@/lib/sanity/types';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await sanityFetch<Event>(eventDetailQuery, { slug });
  return {
    title:
      data?.title ??
      slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
    description: data?.description,
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const data = await sanityFetch<Event>(eventDetailQuery, { slug });

  const title =
    data?.title ??
    slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  return (
    <main className="bg-bg-primary py-section px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <Link href="/resources/events" className="text-accent-blue text-sm hover:underline">
            &larr; Back to Events
          </Link>
          <h1 className="text-h1 text-text-primary mt-6 font-bold tracking-tight">{title}</h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="glass mt-8 rounded-2xl p-8">
            {data ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-6">
                  <div>
                    <p className="text-text-muted text-xs font-medium tracking-wider uppercase">
                      Date
                    </p>
                    <p className="text-accent-blue mt-1 font-medium">
                      {new Date(data.dates.start).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                      {data.dates.end &&
                        ` - ${new Date(data.dates.end).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-muted text-xs font-medium tracking-wider uppercase">
                      Location
                    </p>
                    <p className="text-text-primary mt-1 font-medium">{data.location}</p>
                  </div>
                </div>
                {data.description && <p className="text-text-secondary mt-4">{data.description}</p>}
                {data.externalLink && (
                  <a
                    href={data.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="from-accent-blue to-accent-teal hover:glow-blue mt-6 inline-block rounded-full bg-gradient-to-r px-6 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105"
                  >
                    Visit Event Website
                  </a>
                )}
              </div>
            ) : (
              <p className="text-text-secondary">
                Event details will be loaded from Sanity CMS. Configure your Sanity project to see
                live event content including dates, location, description, and links.
              </p>
            )}
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
