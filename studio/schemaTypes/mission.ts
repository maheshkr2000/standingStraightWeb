import {defineField, defineType} from 'sanity'

export const mission = defineType({
  name: 'mission',
  title: 'Missions',
  type: 'document',
  icon: () => '🏥',
  fields: [
    defineField({
      name: 'name',
      title: 'Mission Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'missionType',
      title: 'Mission Type',
      type: 'string',
      options: {
        list: [
          {title: 'Surgical Mission', value: 'surgical'},
          {title: 'Training Mission', value: 'training'},
          {title: 'Assessment Mission', value: 'assessment'},
          {title: 'Follow-up Mission', value: 'followup'},
          {title: 'Equipment Delivery', value: 'equipment'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Mission Description',
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
      name: 'location',
      title: 'Mission Location',
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
          name: 'hospital',
          title: 'Partner Hospital',
          type: 'string',
        },
        {
          name: 'region',
          title: 'Region/State',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'dates',
      title: 'Mission Dates',
      type: 'object',
      fields: [
        {
          name: 'startDate',
          title: 'Start Date',
          type: 'date',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'endDate',
          title: 'End Date',
          type: 'date',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'plannedDuration',
          title: 'Planned Duration (days)',
          type: 'number',
        },
      ],
    }),
    defineField({
      name: 'status',
      title: 'Mission Status',
      type: 'string',
      options: {
        list: [
          {title: 'Planning', value: 'planning'},
          {title: 'Scheduled', value: 'scheduled'},
          {title: 'In Progress', value: 'in-progress'},
          {title: 'Completed', value: 'completed'},
          {title: 'Cancelled', value: 'cancelled'},
          {title: 'Postponed', value: 'postponed'},
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'planning',
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'teamMember'}],
        },
      ],
    }),
    defineField({
      name: 'teamSize',
      title: 'Total Team Size',
      type: 'number',
      description: 'Total number of team members including local staff',
    }),
    defineField({
      name: 'objectives',
      title: 'Mission Objectives',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of specific goals for this mission',
    }),
    defineField({
      name: 'statistics',
      title: 'Mission Statistics',
      type: 'object',
      fields: [
        {
          name: 'surgeriesPlanned',
          title: 'Surgeries Planned',
          type: 'number',
        },
        {
          name: 'surgeriesCompleted',
          title: 'Surgeries Completed',
          type: 'number',
        },
        {
          name: 'patientsScreened',
          title: 'Patients Screened',
          type: 'number',
        },
        {
          name: 'localStaffTrained',
          title: 'Local Staff Trained',
          type: 'number',
        },
        {
          name: 'equipmentDonated',
          title: 'Equipment Donated',
          type: 'text',
        },
      ],
    }),
    defineField({
      name: 'budget',
      title: 'Mission Budget',
      type: 'object',
      fields: [
        {
          name: 'totalBudget',
          title: 'Total Budget (USD)',
          type: 'number',
        },
        {
          name: 'fundraised',
          title: 'Amount Fundraised (USD)',
          type: 'number',
        },
        {
          name: 'expenses',
          title: 'Major Expenses',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'category',
                  title: 'Expense Category',
                  type: 'string',
                },
                {
                  name: 'amount',
                  title: 'Amount (USD)',
                  type: 'number',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'string',
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'partnerOrganizations',
      title: 'Partner Organizations',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Local hospitals, NGOs, and other partners',
    }),
    defineField({
      name: 'challenges',
      title: 'Challenges Faced',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'successStories',
      title: 'Related Success Stories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'patientStory'}],
        },
      ],
    }),
    defineField({
      name: 'images',
      title: 'Mission Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'reports',
      title: 'Mission Reports',
      type: 'array',
      of: [
        {
          type: 'file',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Report Title',
            },
            {
              name: 'description',
              type: 'string',
              title: 'Description',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'impact',
      title: 'Mission Impact',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Long-term impact and outcomes of this mission',
    }),
    defineField({
      name: 'lessonsLearned',
      title: 'Lessons Learned',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Mission',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      startDate: 'dates.startDate',
      location: 'location',
      status: 'status',
      media: 'featuredImage',
    },
    prepare(selection) {
      const {title, startDate, location, status} = selection
      const locationStr = location ? `${location.city}, ${location.country}` : 'Location TBD'
      return {
        title,
        subtitle: `${locationStr} • ${startDate} • ${status}`,
        media: selection.media,
      }
    },
  },
  orderings: [
    {
      title: 'Start Date, New',
      name: 'startDateDesc',
      by: [{field: 'dates.startDate', direction: 'desc'}],
    },
    {
      title: 'Start Date, Old',
      name: 'startDateAsc',
      by: [{field: 'dates.startDate', direction: 'asc'}],
    },
    {
      title: 'Status',
      name: 'status',
      by: [{field: 'status', direction: 'asc'}],
    },
  ],
})
