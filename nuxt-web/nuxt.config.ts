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

  nitro: {
    preset: "cloudflare_module",
    cloudflare: {
        deployConfig: true,
        nodeCompat: true
    },
    prerender: {
      autoSubfolderIndex: false,
      routes: ["/"],
      crawlLinks: true,
      ignore: ["/playground/**"],
    },
  },

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
      baseURL: "https://public.usemods.com/",
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