'use client';

import { cn } from '@/lib/utils';

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className={cn(
        'glass flex shrink-0 flex-col rounded-xl p-8',
        'snap-center',
        'w-full md:w-[480px]'
      )}
    >
      {/* Decorative quote mark */}
      <span
        className="gradient-text mb-4 text-5xl leading-none font-bold select-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <blockquote className="text-text-secondary flex-1 text-lg leading-relaxed italic">
        {testimonial.quote}
      </blockquote>

      <div className="border-border-subtle mt-6 border-t pt-4">
        <p className="text-text-primary font-semibold">{testimonial.author}</p>
        {(testimonial.role || testimonial.company) && (
          <p className="text-text-muted mt-0.5 text-sm">
            {[testimonial.role, testimonial.company].filter(Boolean).join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  if (testimonials.length === 0) return null;

  // Single testimonial: centered card
  if (testimonials.length === 1) {
    return (
      <section className="px-6 py-(--spacing-section)">
        <div className="mx-auto max-w-2xl">
          <TestimonialCard testimonial={testimonials[0]} />
        </div>
      </section>
    );
  }

  // Multiple: horizontal scroll carousel with snap points
  return (
    <section className="py-(--spacing-section)">
      <div
        className={cn(
          'flex gap-6 overflow-x-auto px-6 pb-4',
          'snap-x snap-mandatory',
          // Hide scrollbar
          '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        )}
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
}
