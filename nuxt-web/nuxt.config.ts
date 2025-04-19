export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    'nuxt-icon',
    '@nuxtjs/seo',
    // '@nuxtjs/sitemap',
    '@nuxthub/core',
  ],

  css: ['~/assets/css/main.css'],

  imports: {
    dirs: ['utils/mods'],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [{ property: 'og:image', content: '/og-image.jpg' }],
    },
  },

  // sitemap: {
  //   sources: [
  //     '/api/sitemap',
  //   ],
  // },

  site: {
    name: 'UseMods',
    description: 'UseMods is a collection of helper functions for JavaScript and TypeScript.',
    url: 'https://usemods.com',
  },

  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
      failOnError: false,
      ignore: [
        '/playground/**'
      ]
    },
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/docs/**': { 
      swr: true, 
      prerender: true,
      static: true
    },
    '/intro/**': { 
      swr: true, 
      prerender: true,
      static: true
    },
    '/playground/**': { 
      ssr: false 
    }
  },

  image: {
    cloudflare: {
      baseURL: 'https://usemods.com/',
      modifiers: {
        format: 'auto',
        quality: 85,
      },
    },
  },

  colorMode: {
    classSuffix: '',
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    // configPath: 'tailwind.config.js',
    exposeConfig: false,
    viewer: true,
    config: {
      content: [
        './components/**/*.{vue,js,ts,jsx,tsx}',
        './layouts/**/*.{vue,js,ts,jsx,tsx}',
        './pages/**/*.{vue,js,ts,jsx,tsx}',
      ],
    },
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-11-14',
})
