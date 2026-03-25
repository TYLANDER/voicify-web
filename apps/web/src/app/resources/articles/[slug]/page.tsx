import type { Metadata } from 'next';
import Link from 'next/link';
import { FadeIn } from '@/components/motion/FadeIn';
import { sanityFetch } from '@/lib/sanity/fetch';
import { articleDetailQuery } from '@/lib/sanity/queries';
import type { Article } from '@/lib/sanity/types';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await sanityFetch<Article>(articleDetailQuery, { slug });
  return {
    title:
      data?.seo?.metaTitle ??
      data?.title ??
      slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
    description: data?.seo?.metaDescription ?? data?.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const data = await sanityFetch<Article>(articleDetailQuery, { slug });

  // Fallback title from slug when CMS data is unavailable
  const title =
    data?.title ??
    slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  const publishedDate = data?.publishedAt
    ? new Date(data.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'January 1, 2024';

  return (
    <main className="bg-bg-primary py-section px-6">
      <article className="mx-auto max-w-3xl">
        <FadeIn>
          <Link href="/resources/articles" className="text-accent-blue text-sm hover:underline">
            &larr; Back to Articles
          </Link>
          <h1 className="text-h1 text-text-primary mt-6 font-bold tracking-tight">{title}</h1>
          <p className="text-text-muted mt-4">Published on {publishedDate}</p>
          {data?.author && <p className="text-text-secondary mt-1 text-sm">By {data.author}</p>}
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="text-text-secondary mt-12 space-y-6 text-lg leading-relaxed">
            {data?.body && data.body.length > 0 ? (
              data.body.map((block, index) => {
                if (block._type === 'block') {
                  const text = (block.children as Array<{ _type: string; text: string }>)
                    ?.map((child) => child.text)
                    .join('');
                  if (!text) return null;
                  return <p key={index}>{text}</p>;
                }
                return null;
              })
            ) : (
              <>
                <p>
                  This article content will be loaded from Sanity CMS. The content management system
                  allows the Voicify team to create, edit, and publish articles with rich text,
                  images, and embedded media.
                </p>
                <p>
                  Configure your Sanity project ID and dataset in the environment variables to
                  connect this page to live CMS content.
                </p>
              </>
            )}
          </div>
        </FadeIn>
      </article>
    </main>
  );
}
