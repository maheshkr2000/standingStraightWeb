import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  icon: () => '📅',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description:
        'Unique URL id for this event (e.g., /upcoming-events/medical-mission-mumbai-2025). Auto‑generated from the title; keep it short, lowercase, and hyphenated.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          {title: 'Surgical Mission', value: 'surgical-mission'},
          {title: 'Training Program', value: 'training-program'},
          {title: 'Outreach Program', value: 'outreach-program'},
          {title: 'Volunteer Training', value: 'volunteer-training'},
          {title: 'Fundraising', value: 'fundraising'},
          {title: 'Medical Education', value: 'medical-education'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {
          name: 'city',
          title: 'City',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'venue',
          title: 'Venue/Hospital',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'detailedDescription',
      title: 'Detailed Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Applications Open', value: 'applications-open'},
          {title: 'Registration Open', value: 'registration-open'},
          {title: 'Volunteers Needed', value: 'volunteers-needed'},
          {title: 'Planning Phase', value: 'planning-phase'},
          {title: 'In Progress', value: 'in-progress'},
          {title: 'Completed', value: 'completed'},
          {title: 'Cancelled', value: 'cancelled'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'urgency',
      title: 'Urgency Level',
      type: 'string',
      options: {
        list: [
          {title: 'High', value: 'high'},
          {title: 'Medium', value: 'medium'},
          {title: 'Low', value: 'low'},
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity/Target',
      type: 'string',
      description: 'e.g., "15 surgeries planned", "25 local surgeons"',
    }),
    defineField({
      name: 'teamSize',
      title: 'Team Information',
      type: 'string',
      description: 'e.g., "8 surgeons, 12 nurses, 4 anesthesiologists"',
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of requirements for participants',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
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
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Event',
      type: 'boolean',
      initialValue: false,
      description: 'Show this event prominently on the homepage',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      startDate: 'startDate',
      status: 'status',
      media: 'featuredImage',
    },
    prepare(selection) {
      const {title, startDate, status} = selection
      return {
        title,
        subtitle: `${startDate} • ${status}`,
      }
    },
  },
  orderings: [
    {
      title: 'Start Date, New',
      name: 'startDateDesc',
      by: [{field: 'startDate', direction: 'desc'}],
    },
    {
      title: 'Start Date, Old',
      name: 'startDateAsc',
      by: [{field: 'startDate', direction: 'asc'}],
    },
  ],
})
