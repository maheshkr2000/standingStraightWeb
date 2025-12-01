import {defineField, defineType} from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  icon: () => '🎬',
  description: 'Homepage hero section with carousel images and content',
  fields: [
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Every Straightened Spine',
    }),
    defineField({
      name: 'subtitle',
      title: 'Hero Subtitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Begins with a Story',
    }),
    defineField({
      name: 'description',
      title: 'Hero Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
      description: 'Main description text shown below the title',
      initialValue: 'World‑class pediatric spinal surgeries for underprivileged children—powered by generous donors, volunteers, and care teams.',
    }),
    defineField({
      name: 'slides',
      title: 'Hero Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Hero Slide',
          fields: [
            {
              name: 'image',
              title: 'Slide Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
            {
              name: 'caption',
              title: 'Image Caption',
              type: 'string',
              description: 'Optional caption for this slide',
            },
          ],
          preview: {
            select: {
              title: 'image.alt',
              caption: 'caption',
              media: 'image',
            },
            prepare(selection: any) {
              const {title, caption} = selection
              return {
                title: title || 'Hero Slide',
                subtitle: caption || 'No caption',
                media: selection.media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(6),
      description: 'Upload 1-6 images for the hero carousel',
    }),
    defineField({
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: 'Donate Now',
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: '/donate',
          description: 'Internal link (e.g., /donate) or external URL',
        },
        {
          name: 'style',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              {title: 'Donate (Orange)', value: 'donate'},
              {title: 'Primary (Blue)', value: 'primary'},
              {title: 'Hero (Teal)', value: 'hero'},
            ],
          },
          initialValue: 'donate',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: 'Our Mission',
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: '/our-mission',
          description: 'Internal link (e.g., /our-mission) or external URL',
        },
        {
          name: 'style',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              {title: 'Hero (Teal)', value: 'hero'},
              {title: 'Primary (Blue)', value: 'primary'},
              {title: 'Outline', value: 'outline'},
            ],
          },
          initialValue: 'hero',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'autoplaySpeed',
      title: 'Autoplay Speed (seconds)',
      type: 'number',
      validation: (Rule) => Rule.min(3).max(10),
      initialValue: 5,
      description: 'How long each slide is shown (3-10 seconds)',
    }),
    defineField({
      name: 'showIndicators',
      title: 'Show Slide Indicators',
      type: 'boolean',
      initialValue: true,
      description: 'Show the dots at the bottom of the carousel',
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Background Overlay Opacity',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(1),
      initialValue: 0.4,
      description: 'Dark overlay opacity (0 = transparent, 1 = solid black)',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Only one hero section should be active at a time',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      slideCount: 'slides',
      isActive: 'isActive',
      lastUpdated: 'lastUpdated',
    },
    prepare(selection) {
      const {title, subtitle, slideCount, isActive, lastUpdated} = selection
      const status = isActive ? 'Active' : 'Inactive'
      const slides = slideCount?.length || 0
      const date = lastUpdated ? new Date(lastUpdated).toLocaleDateString() : 'No date'
      
      return {
        title: `${title} ${subtitle}`,
        subtitle: `${slides} slides • Updated: ${date} • ${status}`,
      }
    },
  },
})
