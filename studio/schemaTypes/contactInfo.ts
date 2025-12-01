import {defineField, defineType} from 'sanity'

export const contactInfo = defineType({
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'document',
  icon: () => '📞',
  description: 'Organization contact details and office information',
  fields: [
    defineField({
      name: 'title',
      title: 'Contact Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'description',
      title: 'Contact Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
      description: 'Brief description for the contact section',
    }),
    defineField({
      name: 'headquarters',
      title: 'Headquarters',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Office Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'address',
          title: 'Address',
          type: 'object',
          fields: [
            {
              name: 'street',
              title: 'Street Address',
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
              name: 'state',
              title: 'State/Province',
              type: 'string',
            },
            {
              name: 'postalCode',
              title: 'Postal Code',
              type: 'string',
            },
            {
              name: 'country',
              title: 'Country',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
        {
          name: 'fax',
          title: 'Fax',
          type: 'string',
        },
        {
          name: 'email',
          title: 'General Email',
          type: 'email',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'hours',
          title: 'Business Hours',
          type: 'string',
          description: 'e.g., "Monday-Friday: 9:00 AM - 5:00 PM EST"',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'departmentContacts',
      title: 'Department Contacts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'department',
              title: 'Department',
              type: 'string',
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  {title: 'General Information', value: 'general'},
                  {title: 'Volunteer Coordination', value: 'volunteers'},
                  {title: 'Donations & Fundraising', value: 'donations'},
                  {title: 'Medical Missions', value: 'missions'},
                  {title: 'Media & Press', value: 'media'},
                  {title: 'Partnerships', value: 'partnerships'},
                  {title: 'Board of Directors', value: 'board'},
                  {title: 'Human Resources', value: 'hr'},
                ],
              },
            },
            {
              name: 'email',
              title: 'Email',
              type: 'email',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'phone',
              title: 'Phone',
              type: 'string',
            },
            {
              name: 'contactPerson',
              title: 'Contact Person',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              description: 'What this department handles',
            },
          ],
          preview: {
            select: {
              title: 'department',
              subtitle: 'email',
              description: 'contactPerson',
            },
            prepare(selection: any) {
              const {title, subtitle, description} = selection
              return {
                title,
                subtitle: `${subtitle}${description ? ` • ${description}` : ''}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'emergencyContact',
      title: 'Emergency Contact',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Emergency Phone',
          type: 'string',
          description: '24/7 emergency contact for missions',
        },
        {
          name: 'email',
          title: 'Emergency Email',
          type: 'email',
        },
        {
          name: 'instructions',
          title: 'Emergency Instructions',
          type: 'text',
          description: 'Instructions for emergency situations',
        },
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'additionalOffices',
      title: 'Additional Offices',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Office Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'type',
              title: 'Office Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Regional Office', value: 'regional'},
                  {title: 'Field Office', value: 'field'},
                  {title: 'Partner Office', value: 'partner'},
                  {title: 'Satellite Office', value: 'satellite'},
                ],
              },
            },
            {
              name: 'address',
              title: 'Address',
              type: 'object',
              fields: [
                {
                  name: 'street',
                  title: 'Street Address',
                  type: 'string',
                },
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
              ],
            },
            {
              name: 'contact',
              title: 'Contact Information',
              type: 'object',
              fields: [
                {
                  name: 'phone',
                  title: 'Phone',
                  type: 'string',
                },
                {
                  name: 'email',
                  title: 'Email',
                  type: 'email',
                },
                {
                  name: 'manager',
                  title: 'Office Manager',
                  type: 'string',
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'name',
              city: 'address.city',
              country: 'address.country',
              type: 'type',
            },
            prepare(selection: any) {
              const {title, city, country, type} = selection
              return {
                title,
                subtitle: `${type} • ${city}, ${country}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'donationInformation',
      title: 'Donation Information',
      type: 'object',
      fields: [
        {
          name: 'taxId',
          title: 'Tax ID / EIN',
          type: 'string',
          description: 'For tax-deductible donations',
        },
        {
          name: 'bankingDetails',
          title: 'Banking Details',
          type: 'object',
          fields: [
            {
              name: 'bankName',
              title: 'Bank Name',
              type: 'string',
            },
            {
              name: 'accountName',
              title: 'Account Name',
              type: 'string',
            },
            {
              name: 'routingNumber',
              title: 'Routing Number',
              type: 'string',
            },
            {
              name: 'accountNumber',
              title: 'Account Number',
              type: 'string',
            },
          ],
        },
        {
          name: 'mailingAddress',
          title: 'Check Mailing Address',
          type: 'text',
          description: 'Address for mailing donation checks',
        },
      ],
    }),
    defineField({
      name: 'mediaKit',
      title: 'Media Kit',
      type: 'object',
      fields: [
        {
          name: 'pressContactEmail',
          title: 'Press Contact Email',
          type: 'email',
        },
        {
          name: 'pressContactPhone',
          title: 'Press Contact Phone',
          type: 'string',
        },
        {
          name: 'pressContactPerson',
          title: 'Press Contact Person',
          type: 'string',
        },
        {
          name: 'logoPackage',
          title: 'Logo Package',
          type: 'file',
          description: 'ZIP file containing organization logos',
        },
        {
          name: 'factSheet',
          title: 'Fact Sheet',
          type: 'file',
          description: 'PDF fact sheet for media',
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
      description: 'Only one contact info document should be active',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      email: 'headquarters.email',
      lastUpdated: 'lastUpdated',
      isActive: 'isActive',
    },
    prepare(selection) {
      const {title, email, lastUpdated, isActive} = selection
      const status = isActive ? 'Active' : 'Inactive'
      const date = lastUpdated ? new Date(lastUpdated).toLocaleDateString() : 'No date'
      return {
        title,
        subtitle: `${email} • Updated: ${date} • ${status}`,
      }
    },
  },
})
