// import useClassy from "../../useclassy/src/index";

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "@nuxt/eslint",
    "@nuxt/icon",
  ],

  css: ["~/assets/css/main.css"],

  imports: {
    dirs: ["utils/mods"],
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      meta: [{ property: "og:image", content: "/og-image.jpg" }],
    },
  },

  // site: {
  //   name: "UseMods",
  //   description:
  //     "UseMods is a collection of helper functions for JavaScript and TypeScript.",
  //   url: "https://usemods.com",
  // },

  nitro: {
    preset: process.env.NODE_ENV === 'production' ? 'cloudflare_pages' : undefined,
    prerender: {
      routes: ["/"],
      crawlLinks: true,
      ignore: ["/playground/**"],
    },
    esbuild: {
      options: {
        target: "esnext",
      },
    },
  },

  // vite: {
  //   plugins: [
  //     useClassy({
  //       language: "vue",
  //       debug: true,
  //     }) as any,
  //   ],
  // },

  routeRules: {
    "/": { prerender: true },
    "/docs/**": {
      swr: true,
      prerender: true,
    },
    "/intro/**": {
      swr: true,
      prerender: true,
    },
    "/playground/**": {
      ssr: false,
    },
  },

  image: {
    cloudflare: {
      baseURL: "https://usemods.com/",
      modifiers: {
        format: "auto",
        quality: 85,
      },
    },
  },

  colorMode: {
    classSuffix: "",
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  tailwindcss: {
    cssPath: "~/assets/css/main.css",
    // configPath: 'tailwind.config.js',
    exposeConfig: false,
    viewer: true,
    config: {
      content: [
        "./components/**/*.{vue,js,ts,jsx,tsx}",
        "./layouts/**/*.{vue,js,ts,jsx,tsx}",
        "./pages/**/*.{vue,js,ts,jsx,tsx}",
        "./.classy/output.classy.html",
      ],
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  devtools: { enabled: true },
  compatibilityDate: "2024-11-14",
});