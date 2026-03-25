import { defineType, defineField } from 'sanity';

export const productPage = defineType({
  name: 'productPage',
  title: 'Product Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'hero', title: 'Hero Section', type: 'hero' }),
    defineField({ name: 'videoEmbed', title: 'Video Embed', type: 'videoEmbed' }),
    defineField({
      name: 'valueProps',
      title: 'Value Propositions',
      type: 'array',
      of: [{ type: 'featureBlock' }],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'featureBlock' }],
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Related Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'productPage' }] }],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title' },
  },
});
