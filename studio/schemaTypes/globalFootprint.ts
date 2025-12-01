import {defineField, defineType} from 'sanity'

export const globalFootprint = defineType({
  name: 'globalFootprint',
  title: 'Global Footprint',
  type: 'document',
  icon: () => '\ud83c\udf0d',
  description: 'Homepage section showing global presence, locations, and contact information',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Global Footprint',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
      initialValue: 'With dual headquarters and a growing network of partners, we\'re building sustainable healthcare infrastructure across continents.',
    }),
    defineField({
      name: 'worldMap',
      title: 'World Map Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Description of the world map image',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'statistics',
      title: 'Statistics',
      type: 'object',
      fields: [
        {
          name: 'countriesActive',
          title: 'Countries Active',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: 'partnerHospitals',
          title: 'Partner Hospitals',
          type: 'string',
          description: 'e.g., "5+", "10+", "25+"',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'locations',
      title: 'Office Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'country',
              title: 'Country',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'city',
              title: 'City',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'role',
              title: 'Office Role',
              type: 'string',
              options: {
                list: [
                  {title: 'Headquarters & Operations', value: 'Headquarters & Operations'},
                  {title: 'Field Operations', value: 'Field Operations'},
                  {title: 'Regional Office', value: 'Regional Office'},
                  {title: 'Training Center', value: 'Training Center'},
                  {title: 'Research Facility', value: 'Research Facility'},
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'contactSection',
      title: 'Contact Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Contact Section Title',
          type: 'string',
          initialValue: 'Get in Touch',
        },
        {
          name: 'ctaButton',
          title: 'CTA Button',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Contact Our Team',
            },
            {
              name: 'link',
              title: 'Button Link',
              type: 'string',
              initialValue: '/contact',
            },
          ],
        },
        defineField({
          name: 'cards',
          title: 'Office Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Office Title', type: 'string', validation: (Rule) => Rule.required() },
                { name: 'locationLine', title: 'Location Line', type: 'string', validation: (Rule) => Rule.required(), description: 'e.g., San Francisco, California' },
                { name: 'email', title: 'Email', type: 'string' },
                { name: 'phone', title: 'Phone', type: 'string' },
                { name: 'accent', title: 'Accent Color', type: 'string', options: { list: [
                  {title: 'Trust Blue', value: 'text-trust-blue'},
                  {title: 'Warm Orange', value: 'text-warm-orange'},
                  {title: 'Primary', value: 'text-primary'},
                  {title: 'Teal', value: 'text-teal-500'},
                ]}},
              ],
            },
          ],
          validation: (Rule) => Rule.min(1).max(6),
          description: 'Add office contact cards displayed below the locations list',
        }),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Only one Global Footprint document should be active at a time.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      countries: 'statistics.countriesActive',
      hospitals: 'statistics.partnerHospitals',
      locations: 'locations',
    },
    prepare(selection) {
      const {title, countries, hospitals, locations} = selection
      const locationCount = Array.isArray(locations) ? locations.length : 0
      return {
        title: title || 'Global Footprint',
        subtitle: `${countries || 0} countries • ${hospitals || '0'} hospitals • ${locationCount} offices`,
      }
    },
  },
})
