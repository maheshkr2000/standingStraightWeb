import {defineField, defineType} from 'sanity'

export const patientStory = defineType({
  name: 'patientStory',
  title: 'Patient Stories',
  type: 'document',
  icon: () => '❤️',
  fields: [
    defineField({
      name: 'title',
      title: 'Story Title',
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
      name: 'patientName',
      title: 'Patient Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Use first name only or pseudonym for privacy',
    }),
    defineField({
      name: 'age',
      title: 'Age at Time of Surgery',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).max(25),
    }),
    defineField({
      name: 'condition',
      title: 'Medical Condition',
      type: 'string',
      options: {
        list: [
          {title: 'Scoliosis', value: 'scoliosis'},
          {title: 'Kyphosis', value: 'kyphosis'},
          {title: 'Spina Bifida', value: 'spina-bifida'},
          {title: 'Congenital Spine Deformity', value: 'congenital-spine-deformity'},
          {title: 'Spinal Tumor', value: 'spinal-tumor'},
          {title: 'Trauma/Injury', value: 'trauma-injury'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Patient Location',
      type: 'object',
      fields: [
        {
          name: 'city',
          title: 'City',
          type: 'string',
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'missionDate',
      title: 'Mission/Surgery Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Story Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
      description: 'Brief summary for preview cards (max 300 characters)',
    }),
    defineField({
      name: 'beforeStory',
      title: 'Before Surgery Story',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
      description: 'Patient\'s life and challenges before surgery',
    }),
    defineField({
      name: 'surgeryDetails',
      title: 'Surgery Details',
      type: 'object',
      fields: [
        {
          name: 'procedure',
          title: 'Surgical Procedure',
          type: 'string',
        },
        {
          name: 'duration',
          title: 'Surgery Duration',
          type: 'string',
        },
        {
          name: 'surgeon',
          title: 'Lead Surgeon',
          type: 'reference',
          to: [{type: 'teamMember'}],
        },
        {
          name: 'hospital',
          title: 'Hospital',
          type: 'string',
        },
        {
          name: 'complications',
          title: 'Any Complications',
          type: 'text',
        },
      ],
    }),
    defineField({
      name: 'afterStory',
      title: 'After Surgery Story',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
      description: 'Recovery and life improvements after surgery',
    }),
    defineField({
      name: 'currentStatus',
      title: 'Current Status',
      type: 'text',
      description: 'How the patient is doing now',
    }),
    defineField({
      name: 'familyQuote',
      title: 'Family Quote/Testimonial',
      type: 'object',
      fields: [
        {
          name: 'quote',
          title: 'Quote',
          type: 'text',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'speaker',
          title: 'Quote Speaker',
          type: 'string',
          description: 'e.g., "Mother", "Father", "Patient"',
        },
      ],
    }),
    defineField({
      name: 'beforeImages',
      title: 'Before Surgery Images',
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
      name: 'afterImages',
      title: 'After Surgery Images',
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
      validation: (Rule) => Rule.required(),
      description: 'Main image for story preview',
    }),
    defineField({
      name: 'outcome',
      title: 'Surgery Outcome',
      type: 'string',
      options: {
        list: [
          {title: 'Excellent', value: 'excellent'},
          {title: 'Good', value: 'good'},
          {title: 'Fair', value: 'fair'},
          {title: 'Ongoing Recovery', value: 'ongoing'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'followUpMonths',
      title: 'Follow-up Period (months)',
      type: 'number',
      description: 'How many months post-surgery this story covers',
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Story',
      type: 'boolean',
      initialValue: false,
      description: 'Show this story prominently on homepage',
    }),
    defineField({
      name: 'consentGiven',
      title: 'Consent for Publication',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
      description: 'Confirm family has given consent to share this story',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      patientName: 'patientName',
      age: 'age',
      condition: 'condition',
      media: 'featuredImage',
    },
    prepare(selection) {
      const {title, patientName, age, condition} = selection
      return {
        title,
        subtitle: `${patientName}, age ${age} • ${condition}`,
        media: selection.media,
      }
    },
  },
  orderings: [
    {
      title: 'Mission Date, New',
      name: 'missionDateDesc',
      by: [{field: 'missionDate', direction: 'desc'}],
    },
    {
      title: 'Patient Name A-Z',
      name: 'patientNameAsc',
      by: [{field: 'patientName', direction: 'asc'}],
    },
  ],
})
