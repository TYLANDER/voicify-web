import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/sections/Hero';
import { FadeIn } from '@/components/motion/FadeIn';
import { StaggerChildren } from '@/components/motion/StaggerChildren';
import { sanityFetch } from '@/lib/sanity/fetch';
import { articlesListQuery } from '@/lib/sanity/queries';
import type { Article } from '@/lib/sanity/types';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Stay updated on Voice AI news, insights, and best practices from the Voicify team.',
};

// Placeholder articles — used as fallback when Sanity is unconfigured
const placeholderArticles = [
  {
    slug: 'voice-ai-restaurant-industry',
    title: 'How Voice AI is Transforming the Restaurant Industry',
    excerpt:
      'Discover how restaurants are using Voice AI to increase answered calls by 2-3x and drive more orders.',
    publishedAt: '2024-06-15',
    categories: ['Restaurants', 'Voice AI'],
  },
  {
    slug: 'hipaa-compliant-voice-ai',
    title: 'HIPAA Compliant Voice AI for Healthcare',
    excerpt: 'Learn about the security measures that make Voice AI safe for handling patient data.',
    publishedAt: '2024-05-20',
    categories: ['Healthcare', 'Security'],
  },
  {
    slug: 'future-of-customer-service',
    title: 'The Future of Customer Service: AI Voice Agents',
    excerpt: 'Explore how AI voice agents are reshaping customer service across industries.',
    publishedAt: '2024-04-10',
    categories: ['Industry Trends'],
  },
];

export default async function ArticlesPage() {
  const cmsArticles = await sanityFetch<Article[]>(articlesListQuery, {}, 30);

  const articles =
    cmsArticles && cmsArticles.length > 0
      ? cmsArticles.map((a) => ({
          slug: a.slug.current,
          title: a.title,
          excerpt: a.excerpt ?? '',
          publishedAt: a.publishedAt,
          categories: a.categories ?? [],
        }))
      : placeholderArticles;

  return (
    <main>
      <Hero
        heading="Articles"
        subheading="Insights and updates from the Voicify team"
        variant="default"
      />

      <section className="bg-bg-primary py-section px-6">
        <div className="mx-auto max-w-7xl">
          <StaggerChildren className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/resources/articles/${article.slug}`}
                className="glass group hover:border-border-hover hover:glow-blue rounded-xl p-6 transition-all"
              >
                <div className="bg-bg-tertiary mb-4 aspect-video rounded-lg" />
                <div className="flex flex-wrap gap-2">
                  {article.categories.map((cat) => (
                    <span
                      key={cat}
                      className="bg-accent-blue/10 text-accent-blue rounded-full px-3 py-1 text-xs font-medium"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <h2 className="text-text-primary group-hover:gradient-text mt-3 text-lg font-semibold">
                  {article.title}
                </h2>
                <p className="text-text-secondary mt-2 text-sm">{article.excerpt}</p>
                <p className="text-text-muted mt-4 text-xs">
                  {new Date(article.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </Link>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </main>
  );
}
