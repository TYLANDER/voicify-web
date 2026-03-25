import { defineType, defineField } from 'sanity';

export const industryPage = defineType({
  name: 'industryPage',
  title: 'Industry Page',
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
    defineField({
      name: 'painPoints',
      title: 'Pain Points / Challenges',
      type: 'array',
      of: [{ type: 'featureBlock' }],
    }),
    defineField({
      name: 'solutions',
      title: 'Solutions / Features',
      type: 'array',
      of: [{ type: 'featureBlock' }],
    }),
    defineField({ name: 'testimonial', title: 'Testimonial', type: 'testimonial' }),
    defineField({ name: 'integrationInfo', title: 'Integration Info', type: 'text' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title' },
  },
});
