import { defineType, defineField } from 'sanity';

export const event = defineType({
  name: 'event',
  title: 'Event',
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
    defineField({
      name: 'dates',
      title: 'Dates',
      type: 'object',
      fields: [
        { name: 'start', title: 'Start Date', type: 'date', validation: (R) => R.required() },
        { name: 'end', title: 'End Date', type: 'date' },
      ],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'externalLink', title: 'External Link', type: 'url' }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  orderings: [
    { title: 'Date, Newest', name: 'dateDesc', by: [{ field: 'dates.start', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', location: 'location', date: 'dates.start' },
    prepare({ title, location, date }) {
      return {
        title,
        subtitle:
          `${location || ''} ${date ? `• ${new Date(date).toLocaleDateString()}` : ''}`.trim(),
      };
    },
  },
});
