import { defineType, defineField } from 'sanity';

export const featureBlock = defineType({
  name: 'featureBlock',
  title: 'Feature Block',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon Name (Lucide)',
      type: 'string',
      description: 'Lucide icon name, e.g. "Phone", "Clock", "Shield"',
    }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (R) => R.required(),
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
});
