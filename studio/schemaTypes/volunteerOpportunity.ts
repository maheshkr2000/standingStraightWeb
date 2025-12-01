import {defineField, defineType} from 'sanity'

export const volunteerOpportunity = defineType({
  name: 'volunteerOpportunity',
  title: 'Volunteer Opportunities',
  type: 'document',
  icon: () => '🤝',
  fields: [
    defineField({
      name: 'title',
      title: 'Opportunity Title',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Volunteer Type',
      type: 'string',
      options: {
        list: [
          {title: 'Medical', value: 'medical'},
          {title: 'Education', value: 'education'},
          {title: 'Administrative', value: 'administrative'},
          {title: 'Fundraising', value: 'fundraising'},
          {title: 'Research', value: 'research'},
          {title: 'Community Outreach', value: 'community-outreach'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'commitment',
      title: 'Time Commitment',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "7-14 days", "3-5 days", "Ongoing"',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "India, Mexico, Bangladesh", "Remote", "Virtual Event"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'detailedDescription',
      title: 'Detailed Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required(),
      description: 'List of qualifications and requirements',
    }),
    defineField({
      name: 'roles',
      title: 'Specific Roles',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of specific positions available',
    }),
    defineField({
      name: 'impact',
      title: 'Impact Statement',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'How this role makes a difference',
    }),
    defineField({
      name: 'skillsNeeded',
      title: 'Skills Needed',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Specific skills or qualifications required',
    }),
    defineField({
      name: 'training',
      title: 'Training Provided',
      type: 'object',
      fields: [
        {
          name: 'isProvided',
          title: 'Training Provided',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'description',
          title: 'Training Description',
          type: 'text',
        },
        {
          name: 'duration',
          title: 'Training Duration',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'compensation',
      title: 'Compensation Details',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Compensation Type',
          type: 'string',
          options: {
            list: [
              {title: 'Volunteer (Unpaid)', value: 'volunteer'},
              {title: 'Expenses Covered', value: 'expenses-covered'},
              {title: 'Stipend Provided', value: 'stipend'},
              {title: 'Paid Position', value: 'paid'},
            ],
          },
          initialValue: 'volunteer',
        },
        {
          name: 'details',
          title: 'Compensation Details',
          type: 'text',
          description: 'Details about what is covered or provided',
        },
      ],
    }),
    defineField({
      name: 'applicationProcess',
      title: 'Application Process',
      type: 'object',
      fields: [
        {
          name: 'steps',
          title: 'Application Steps',
          type: 'array',
          of: [{type: 'string'}],
        },
        {
          name: 'documents',
          title: 'Required Documents',
          type: 'array',
          of: [{type: 'string'}],
        },
        {
          name: 'timeline',
          title: 'Application Timeline',
          type: 'string',
        },
        {
          name: 'contactEmail',
          title: 'Contact Email',
          type: 'email',
        },
      ],
    }),
    defineField({
      name: 'urgency',
      title: 'Urgency Level',
      type: 'string',
      options: {
        list: [
          {title: 'Immediate', value: 'immediate'},
          {title: 'High', value: 'high'},
          {title: 'Medium', value: 'medium'},
          {title: 'Low', value: 'low'},
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'status',
      title: 'Opportunity Status',
      type: 'string',
      options: {
        list: [
          {title: 'Open', value: 'open'},
          {title: 'Closing Soon', value: 'closing-soon'},
          {title: 'Filled', value: 'filled'},
          {title: 'On Hold', value: 'on-hold'},
          {title: 'Cancelled', value: 'cancelled'},
        ],
      },
      initialValue: 'open',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'openings',
      title: 'Number of Openings',
      type: 'number',
      validation: (Rule) => Rule.min(0),
      description: 'How many volunteers needed for this role',
    }),
    defineField({
      name: 'applicationDeadline',
      title: 'Application Deadline',
      type: 'date',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    }),
    defineField({
      name: 'relatedMission',
      title: 'Related Mission',
      type: 'reference',
      to: [{type: 'mission'}],
      description: 'Link to a specific mission if applicable',
    }),
    defineField({
      name: 'relatedEvent',
      title: 'Related Event',
      type: 'reference',
      to: [{type: 'event'}],
      description: 'Link to a specific event if applicable',
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
      name: 'testimonials',
      title: 'Volunteer Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Testimonial Quote',
              type: 'text',
            },
            {
              name: 'author',
              title: 'Volunteer Name',
              type: 'string',
            },
            {
              name: 'role',
              title: 'Volunteer Role',
              type: 'string',
            },
            {
              name: 'mission',
              title: 'Mission Year/Location',
              type: 'string',
            },
          ],
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
      title: 'Featured Opportunity',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isUrgent',
      title: 'Mark as Urgent',
      type: 'boolean',
      initialValue: false,
      description: 'Show urgent badge on this opportunity',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      commitment: 'commitment',
      location: 'location',
      status: 'status',
      media: 'featuredImage',
    },
    prepare(selection) {
      const {title, type, commitment, location, status} = selection
      return {
        title,
        subtitle: `${type} • ${commitment} • ${location} • ${status}`,
        media: selection.media,
      }
    },
  },
  orderings: [
    {
      title: 'Application Deadline',
      name: 'applicationDeadline',
      by: [{field: 'applicationDeadline', direction: 'asc'}],
    },
    {
      title: 'Urgency Level',
      name: 'urgency',
      by: [{field: 'urgency', direction: 'asc'}],
    },
    {
      title: 'Type',
      name: 'type',
      by: [{field: 'type', direction: 'asc'}],
    },
  ],
})
