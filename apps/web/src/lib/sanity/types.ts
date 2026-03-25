import type { PortableTextBlock } from '@sanity/types';

// Shared types
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
  noIndex?: boolean;
}

export interface Slug {
  _type: 'slug';
  current: string;
}

// Object types
export interface Hero {
  heading: string;
  subheading?: string;
  backgroundType?: 'gradient' | 'image' | 'video';
  backgroundImage?: SanityImage;
  ctaText?: string;
  ctaLink?: string;
}

export interface FeatureBlock {
  icon?: string;
  title: string;
  description: string;
}

export interface CTABlock {
  heading: string;
  buttonText: string;
  buttonLink: string;
  variant?: 'primary' | 'secondary';
}

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: SanityImage;
}

export interface VideoEmbed {
  url: string;
  thumbnail?: SanityImage;
  title?: string;
}

// Document types
export interface SiteSettings {
  navigation: unknown;
  footer: unknown;
  contactInfo: {
    address: string;
    phone: string;
    email: string;
    linkedin?: string;
  };
  complianceBadges: Array<{ name: string; icon: string }>;
  socialLinks: Array<{ platform: string; url: string }>;
}

export interface ProductPage {
  title: string;
  slug: Slug;
  hero: Hero;
  videoEmbed?: VideoEmbed;
  valueProps: FeatureBlock[];
  features: FeatureBlock[];
  relatedProducts?: Array<{
    title: string;
    slug: Slug;
    hero: { heading: string };
  }>;
  seo?: SEO;
}

export interface IndustryPage {
  title: string;
  slug: Slug;
  hero: Hero;
  painPoints?: FeatureBlock[];
  solutions: FeatureBlock[];
  testimonial?: Testimonial;
  integrationInfo?: string;
  seo?: SEO;
}

export interface Page {
  title: string;
  slug: Slug;
  content: PortableTextBlock[];
  seo?: SEO;
}

export interface Article {
  title: string;
  slug: Slug;
  author?: string;
  publishedAt: string;
  excerpt?: string;
  body: PortableTextBlock[];
  featuredImage?: SanityImage;
  categories?: string[];
  seo?: SEO;
}

export interface Event {
  title: string;
  slug: Slug;
  dates: {
    start: string;
    end?: string;
  };
  location: string;
  description?: string;
  externalLink?: string;
  featuredImage?: SanityImage;
}

export interface Partner {
  name: string;
  logo?: SanityImage;
  description?: string;
  quote?: string;
  quoteAuthor?: string;
  website?: string;
  category: 'technology' | 'restaurant' | 'healthcare' | 'automotive';
}
