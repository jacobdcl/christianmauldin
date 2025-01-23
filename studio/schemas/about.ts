import { Rule } from '@sanity/types'

export default {
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'instagram',
      title: 'Instagram Username',
      type: 'string',
      description: 'Just the username without @ or URL'
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
} 