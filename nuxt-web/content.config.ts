import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    intro: defineCollection({
      source: '1.intro/**',
      type: 'page'
    }),
    docs: defineCollection({
      source: '2.docs/**',
      type: 'page'
    }),
    all: defineCollection({
      source: '**',
      type: 'page'
    })
  }
})