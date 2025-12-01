import {defineField, defineType} from 'sanity'

export const partner = defineType({
  name: 'partner',
  title: 'Partners',
  type: 'document',
  icon: () => '🤝',
  fields: [
    defineField({
      name: 'name',
      title: 'Partner Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Partner Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      description: 'Optional link to partner website',
    }),
    defineField({
      name: 'isActive',
      title: 'Active Partnership',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Partner',
      type: 'boolean',
      initialValue: false,
      description: 'Show this partner prominently',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order for displaying partners (lower numbers first)',
    }),
    defineField({
      name: 'tier',
      title: 'Partnership Tier',
      type: 'string',
      options: {
        list: [
          {title: 'Platinum', value: 'platinum'},
          {title: 'Gold', value: 'gold'},
          {title: 'Silver', value: 'silver'},
          {title: 'Bronze', value: 'bronze'},
          {title: 'Standard', value: 'standard'},
        ],
      },
      description: 'Optional partnership tier classification',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      isActive: 'isActive',
    },
    prepare(selection) {
      const {title, isActive} = selection
      const status = isActive ? 'Active' : 'Inactive'
      return {
        title,
        subtitle: status,
        media: selection.media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{field: 'displayOrder', direction: 'asc'}],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
    {
      title: 'Partnership Tier',
      name: 'tier',
      by: [{field: 'tier', direction: 'asc'}],
    },
  ],
})
