import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'standing-straight-cms',
  title: 'Standing Straight CMS',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'wfeqwe3v',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  cors: {
    credentials: true,
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://standing-straight-website.vercel.app',
      /^https:\/\/.*\.vercel\.app$/,
    ],
  },

  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'wfeqwe3v',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
})
