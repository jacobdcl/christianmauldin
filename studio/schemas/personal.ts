import { Rule } from '@sanity/types';

export default {
  name: 'personal',
  title: 'Personal Photography',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ],
      validation: (Rule: Rule) => Rule
        .required()
        .min(1)
        .max(30)
        .warning('You can only add up to 30 images')
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
      hidden: true
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0'
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    }
  ]
} 