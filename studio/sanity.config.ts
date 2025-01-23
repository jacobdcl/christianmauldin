import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import print from './schemas/print'
import personal from './schemas/personal'
import work from './schemas/work'
import about from './schemas/about'

export default defineConfig({
  name: 'default',
  title: 'Christian Mauldin Portfolio',

  projectId: 'tuca5i9i',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: [print, personal, work, about],
  },
})
