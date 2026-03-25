import type { Metadata } from 'next';
import { ScheduleForm } from '@/components/sections/ScheduleForm';
import { FadeIn } from '@/components/motion/FadeIn';
import { siteConfig } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Schedule a Meeting',
  description: 'Book a real, live, human meeting. Explore how Voicify can work for you.',
};

export default function SchedulePage() {
  return (
    <main className="bg-bg-primary py-section px-6">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <h1 className="text-h1 text-text-primary text-center font-bold tracking-tight">
            Book a Real, Live, Human Meeting
          </h1>
          <p className="text-text-secondary mt-4 text-center text-lg">
            Explore how Voicify can work for you.
          </p>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <FadeIn delay={0.1}>
            <div className="space-y-8">
              <div>
                <h2 className="text-h3 text-text-primary font-semibold">Schedule a Meeting</h2>
                <p className="text-text-secondary mt-2">
                  Fill out the form and we&apos;ll set up a time to show you how Voicify can
                  transform your business.
                </p>
              </div>

              <div className="space-y-4">
                <div className="glass rounded-xl p-4">
                  <p className="text-text-muted text-sm">Address</p>
                  <p className="text-text-primary">{siteConfig.company.address}</p>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="text-text-muted text-sm">Phone</p>
                  <a
                    href={`tel:${siteConfig.company.phone}`}
                    className="text-accent-blue hover:underline"
                  >
                    {siteConfig.company.phone}
                  </a>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="text-text-muted text-sm">Email</p>
                  <a
                    href={`mailto:${siteConfig.company.email}`}
                    className="text-accent-blue hover:underline"
                  >
                    {siteConfig.company.email}
                  </a>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="text-text-muted text-sm">LinkedIn</p>
                  <a
                    href={siteConfig.company.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-blue hover:underline"
                  >
                    Voicify Software
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="glass rounded-2xl p-8">
              <ScheduleForm />
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
