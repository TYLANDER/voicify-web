import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/sections/Hero';
import { FadeIn } from '@/components/motion/FadeIn';
import { StaggerChildren } from '@/components/motion/StaggerChildren';
import { sanityFetch } from '@/lib/sanity/fetch';
import { eventsListQuery } from '@/lib/sanity/queries';
import type { Event } from '@/lib/sanity/types';

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Voicify Leadership attends events year round to present voice experience solutions.',
};

const placeholderEvents = [
  {
    slug: 'murtec-2025',
    title: 'MURTEC',
    dates: { start: '2025-03-10', end: '2025-03-12' },
    location: 'Las Vegas',
  },
  {
    slug: 'pizza-expo-2025',
    title: 'International Pizza Expo',
    dates: { start: '2025-03-24', end: '2025-03-26' },
    location: 'Las Vegas',
  },
  {
    slug: 'nra-show-2025',
    title: 'National Restaurant Association Show',
    dates: { start: '2025-05-17', end: '2025-05-20' },
    location: 'Chicago',
  },
  {
    slug: 'fstec-2025',
    title: 'FSTEC',
    dates: { start: '2025-09-15', end: '2025-09-17' },
    location: 'Dallas',
  },
];

export default async function EventsPage() {
  const cmsEvents = await sanityFetch<Event[]>(eventsListQuery, {}, 30);

  const events =
    cmsEvents && cmsEvents.length > 0
      ? cmsEvents.map((e) => ({
          slug: e.slug.current,
          title: e.title,
          dates: e.dates,
          location: e.location,
        }))
      : placeholderEvents;

  return (
    <main>
      <Hero
        heading="Events"
        subheading="Meet the Voicify team at industry events throughout the year"
        variant="default"
      />

      <section className="bg-bg-primary py-section px-6">
        <div className="mx-auto max-w-4xl">
          <StaggerChildren className="space-y-6">
            {events.map((event) => (
              <Link
                key={event.slug}
                href={`/resources/events/${event.slug}`}
                className="glass group hover:border-border-hover hover:glow-blue flex items-center justify-between rounded-xl p-6 transition-all"
              >
                <div>
                  <h2 className="text-text-primary group-hover:gradient-text text-lg font-semibold">
                    {event.title}
                  </h2>
                  <p className="text-text-muted mt-1 text-sm">{event.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-accent-blue text-sm font-medium">
                    {new Date(event.dates.start).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                    {event.dates.end &&
                      ` - ${new Date(event.dates.end).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}`}
                  </p>
                  <p className="text-text-muted text-xs">
                    {new Date(event.dates.start).getFullYear()}
                  </p>
                </div>
              </Link>
            ))}
          </StaggerChildren>

          <FadeIn delay={0.3}>
            <div className="mt-16 text-center">
              <h2 className="text-h3 text-text-primary font-semibold">Let&apos;s connect!</h2>
              <p className="text-text-secondary mt-2">Want to meet us at an upcoming event?</p>
              <Link
                href="/contact"
                className="from-accent-blue to-accent-teal hover:glow-blue mt-6 inline-block rounded-full bg-gradient-to-r px-8 py-3 font-semibold text-white transition-all hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
