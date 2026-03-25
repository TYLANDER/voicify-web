import { defineType, defineField } from 'sanity';

export const videoEmbed = defineType({
  name: 'videoEmbed',
  title: 'Video Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'Video URL (YouTube or Vimeo)',
      type: 'url',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Custom Thumbnail',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
  ],
});
