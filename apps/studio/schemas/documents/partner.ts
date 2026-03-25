import { defineType, defineField } from 'sanity';

export const partner = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3 }),
    defineField({ name: 'quoteAuthor', title: 'Quote Author', type: 'string' }),
    defineField({ name: 'website', title: 'Website', type: 'url' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Technology', value: 'technology' },
          { title: 'Restaurant', value: 'restaurant' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Automotive', value: 'automotive' },
        ],
      },
      validation: (R) => R.required(),
    }),
  ],
  preview: {
    select: { title: 'name', category: 'category' },
    prepare({ title, category }) {
      return { title, subtitle: category };
    },
  },
});
