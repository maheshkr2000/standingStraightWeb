import {defineField, defineType} from 'sanity'

export const missionSnapshot = defineType({
  name: 'missionSnapshot',
  title: 'Mission Snapshot',
  type: 'document',
  icon: () => '📊',
  description: 'Overall statistics and impact data for the homepage',
  fields: [
    defineField({
      name: 'title',
      title: 'Snapshot Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Our Mission in Numbers',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
      description: 'Brief description shown above the statistics',
    }),
    defineField({
      name: 'statistics',
      title: 'Key Statistics',
      type: 'object',
      fields: [
        {
          name: 'surgeriesPerformed',
          title: 'Total Surgeries Performed',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: 'childrenHelped',
          title: 'Children Helped',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: 'countriesServed',
          title: 'Countries Served',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: 'localSurgeonsTrained',
          title: 'Local Surgeons Trained',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: 'partnersActive',
          title: 'Active Partners',
          type: 'number',
          validation: (Rule) => Rule.min(0),
        },
        {
          name: 'volunteersEngaged',
          title: 'Volunteers Engaged',
          type: 'number',
          validation: (Rule) => Rule.min(0),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission Statement',
      type: 'text',
      validation: (Rule) => Rule.required(),
      description: 'Brief mission statement for the homepage',
    }),
    defineField({
      name: 'visionStatement',
      title: 'Vision Statement',
      type: 'text',
      description: 'Organization vision statement',
    }),
    defineField({
      name: 'keyPrograms',
      title: 'Key Programs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Program Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Program Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide icon name (e.g., "heart", "users", "stethoscope")',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(4),
      description: 'Maximum 4 key programs to highlight',
    }),
    defineField({
      name: 'impactHighlights',
      title: 'Impact Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'metric',
              title: 'Metric',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'e.g., "98%", "24/7", "15 years"',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string',
              // Made optional: remove required validation to allow metric+value only
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Only one mission snapshot should be active at a time',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      lastUpdated: 'lastUpdated',
      surgeriesPerformed: 'statistics.surgeriesPerformed',
      isActive: 'isActive',
    },
    prepare(selection) {
      const {title, lastUpdated, surgeriesPerformed, isActive} = selection
      const status = isActive ? 'Active' : 'Inactive'
      const date = lastUpdated ? new Date(lastUpdated).toLocaleDateString() : 'No date'
      return {
        title,
        subtitle: `${surgeriesPerformed} surgeries • Updated: ${date} • ${status}`,
      }
    },
  },
})
