// Document types
import { siteSettings } from './documents/siteSettings';
import { productPage } from './documents/productPage';
import { industryPage } from './documents/industryPage';
import { page } from './documents/page';
import { article } from './documents/article';
import { event } from './documents/event';
import { partner } from './documents/partner';

// Object types
import { hero } from './objects/hero';
import { featureBlock } from './objects/featureBlock';
import { ctaBlock } from './objects/ctaBlock';
import { testimonial } from './objects/testimonial';
import { videoEmbed } from './objects/videoEmbed';
import { seo } from './objects/seo';

export const schemaTypes = [
  // Documents
  siteSettings,
  productPage,
  industryPage,
  page,
  article,
  event,
  partner,
  // Objects
  hero,
  featureBlock,
  ctaBlock,
  testimonial,
  videoEmbed,
  seo,
];
