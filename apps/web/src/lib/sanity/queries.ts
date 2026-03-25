import { groq } from 'next-sanity';

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    navigation,
    footer,
    contactInfo,
    complianceBadges,
    socialLinks
  }
`;

// Product Pages
export const productPageQuery = groq`
  *[_type == "productPage" && slug.current == $slug][0] {
    title,
    slug,
    hero,
    videoEmbed,
    valueProps[] {
      icon,
      title,
      description
    },
    features[] {
      icon,
      title,
      description
    },
    relatedProducts[]-> {
      title,
      slug,
      hero { heading }
    },
    seo
  }
`;

export const allProductPagesQuery = groq`
  *[_type == "productPage"] {
    slug
  }
`;

// Industry Pages
export const industryPageQuery = groq`
  *[_type == "industryPage" && slug.current == $slug][0] {
    title,
    slug,
    hero,
    painPoints[] {
      icon,
      title,
      description
    },
    solutions[] {
      icon,
      title,
      description
    },
    testimonial {
      quote,
      author,
      role,
      company
    },
    integrationInfo,
    seo
  }
`;

export const allIndustryPagesQuery = groq`
  *[_type == "industryPage"] {
    slug
  }
`;

// Generic Pages
export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    title,
    slug,
    content,
    seo
  }
`;

// Articles
export const articlesListQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    title,
    slug,
    excerpt,
    publishedAt,
    featuredImage,
    categories
  }
`;

export const articleDetailQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    title,
    slug,
    author,
    publishedAt,
    excerpt,
    body,
    featuredImage,
    categories,
    seo
  }
`;

export const allArticleSlugsQuery = groq`
  *[_type == "article"] { slug }
`;

// Events
export const eventsListQuery = groq`
  *[_type == "event"] | order(dates.start desc) {
    title,
    slug,
    dates,
    location,
    description,
    featuredImage
  }
`;

export const eventDetailQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    title,
    slug,
    dates,
    location,
    description,
    externalLink,
    featuredImage
  }
`;

export const allEventSlugsQuery = groq`
  *[_type == "event"] { slug }
`;

// Partners
export const partnersQuery = groq`
  *[_type == "partner"] | order(name asc) {
    name,
    logo,
    description,
    quote,
    quoteAuthor,
    website,
    category
  }
`;
