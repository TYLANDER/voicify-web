import { defineType, defineField } from 'sanity';

export const ctaBlock = defineType({
  name: 'ctaBlock',
  title: 'CTA Block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: { list: ['primary', 'secondary'] },
      initialValue: 'primary',
    }),
  ],
});
