import { defineField, defineType } from 'sanity'

export const howYouCanHelp = defineType({
  name: 'howYouCanHelp',
  title: 'How You Can Help',
  type: 'document',
  icon: () => '🤝',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'How You Can Make a Difference',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      initialValue:
        "Every contribution, big or small, helps us reach more children and transform more lives.",
    }),
    defineField({
      name: 'cards',
      title: 'Action Cards',
      type: 'array',
      of: [
        defineType({
          name: 'helpCard',
          title: 'Help Card',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'icon', title: 'Icon (lucide name)', type: 'string', description: 'e.g., heart, hand-heart, megaphone' }),
            defineField({ name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.required() }),
            defineField({ name: 'bullets', title: 'Bullet Points', type: 'array', of: [{ type: 'string' }], validation: (Rule) => Rule.max(6) }),
            defineField({ name: 'ctaText', title: 'Button Text', type: 'string' }),
            defineField({ name: 'ctaLink', title: 'Button Link', type: 'string' }),
            defineField({ name: 'ctaVariant', title: 'Button Variant', type: 'string', description: 'donate | mission | story | outline | hero' }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(3),
    }),
    defineField({
      name: 'ctaBannerTitle',
      title: 'CTA Banner Title',
      type: 'string',
      initialValue: 'Ready to Change a Life Today?',
    }),
    defineField({
      name: 'ctaBannerSubtitle',
      title: 'CTA Banner Subtitle',
      type: 'text',
      initialValue: 'Join thousands of supporters who believe every child deserves to stand tall.',
    }),
    defineField({
      name: 'ctaPrimary',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        { name: 'text', title: 'Text', type: 'string' },
        { name: 'link', title: 'Link', type: 'string' },
        { name: 'variant', title: 'Variant', type: 'string' },
      ],
    }),
    defineField({
      name: 'ctaSecondary',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        { name: 'text', title: 'Text', type: 'string' },
        { name: 'link', title: 'Link', type: 'string' },
        { name: 'variant', title: 'Variant', type: 'string' },
      ],
    }),
    defineField({ name: 'isActive', title: 'Active', type: 'boolean', initialValue: true }),
    defineField({ name: 'lastUpdated', title: 'Last Updated', type: 'datetime', initialValue: () => new Date().toISOString() }),
  ],
})
