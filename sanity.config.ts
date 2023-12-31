/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...index]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
// import {apiVersion, dataset, projectId} from './sanity/env'
import {schemaTypes} from './sanity/schemas/index'

export default defineConfig({
  basePath: '/studio',
  projectId: 'w6nkwdey',
  dataset: 'production',
  // Add and edit the content schema in the './sanity/schema' folder
  schemaTypes,
  plugins: [
    deskTool(),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: 'v2021-10-21'}),
  ],
})
