import {defineField, defineType} from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  icon: () => '👨‍⚕️',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
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
      name: 'title',
      title: 'Professional Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "Chief of Orthopedic Surgery", "Pediatric Spine Specialist"',
    }),
    defineField({
      name: 'specialization',
      title: 'Medical Specialization',
      type: 'string',
      options: {
        list: [
          {title: 'Orthopedic Surgery', value: 'orthopedic-surgery'},
          {title: 'Pediatric Surgery', value: 'pediatric-surgery'},
          {title: 'Spinal Surgery', value: 'spinal-surgery'},
          {title: 'Anesthesiology', value: 'anesthesiology'},
          {title: 'Nursing', value: 'nursing'},
          {title: 'Physical Therapy', value: 'physical-therapy'},
          {title: 'Administration', value: 'administration'},
          {title: 'Program Management', value: 'program-management'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'detailedBio',
      title: 'Detailed Biography',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials & Education',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List degrees, certifications, and major achievements',
    }),
    defineField({
      name: 'experience',
      title: 'Years of Experience',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'hospital',
      title: 'Primary Hospital/Institution',
      type: 'string',
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
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'photo',
      title: 'Profile Photo',
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
      name: 'email',
      title: 'Email',
      type: 'email',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
        },
        {
          name: 'website',
          title: 'Personal Website',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'role',
      title: 'Role in Organization',
      type: 'string',
      options: {
        list: [
          {title: 'Board Member', value: 'board-member'},
          {title: 'Medical Director', value: 'medical-director'},
          {title: 'Program Director', value: 'program-director'},
          {title: 'Senior Surgeon', value: 'senior-surgeon'},
          {title: 'Volunteer Surgeon', value: 'volunteer-surgeon'},
          {title: 'Nurse Coordinator', value: 'nurse-coordinator'},
          {title: 'Administrator', value: 'administrator'},
          {title: 'Volunteer', value: 'volunteer'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'missionCount',
      title: 'Number of Missions Participated',
      type: 'number',
      validation: (Rule) => Rule.min(0),
      initialValue: 0,
    }),
    defineField({
      name: 'languages',
      title: 'Languages Spoken',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'isActive',
      title: 'Currently Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Team Member',
      type: 'boolean',
      initialValue: false,
      description: 'Show this team member prominently',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'photo',
      role: 'role',
    },
    prepare(selection) {
      const {title, subtitle, role} = selection
      return {
        title,
        subtitle: `${subtitle} • ${role}`,
        media: selection.media,
      }
    },
  },
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{field: 'displayOrder', direction: 'asc'}],
    },
    {
      title: 'Role',
      name: 'role',
      by: [{field: 'role', direction: 'asc'}],
    },
  ],
})
