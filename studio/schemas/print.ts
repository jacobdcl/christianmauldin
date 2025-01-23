import { Rule } from '@sanity/types';

const defaultSizes = [
  { width: 8, height: 10, price: 50 },
  { width: 12, height: 16, price: 100 },
  { width: 16, height: 20, price: 150 },
  { width: 20, height: 24, price: 200 }
];

export default {
  name: 'print',
  title: 'Print',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'sizes',
      title: 'Print Sizes',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'width',
            title: 'Width (inches)',
            type: 'number',
            validation: (Rule: Rule) => Rule.required().min(1)
          },
          {
            name: 'height',
            title: 'Height (inches)',
            type: 'number',
            validation: (Rule: Rule) => Rule.required().min(1)
          },
          {
            name: 'price',
            title: 'Price ($)',
            type: 'number',
            validation: (Rule: Rule) => Rule.required().min(0)
          },
          {
            name: 'inStock',
            title: 'In Stock',
            type: 'boolean',
            initialValue: true
          }
        ],
        preview: {
          select: {
            width: 'width',
            height: 'height',
            price: 'price',
            inStock: 'inStock'
          },
          prepare(selection: { width: number; height: number; price: number; inStock: boolean }) {
            return {
              title: `${selection.width}" × ${selection.height}"`,
              subtitle: `$${selection.price} - ${selection.inStock ? 'In Stock' : 'Out of Stock'}`
            };
          }
        }
      }],
      validation: (Rule: Rule) => Rule.required().min(1),
      initialValue: defaultSizes.map(size => ({
        width: size.width,
        height: size.height,
        price: size.price,
        inStock: true
      }))
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    }
  }
} 