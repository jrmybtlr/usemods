// import useClassy from "../../useclassy/src/index";

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "@nuxt/eslint",
    "@nuxt/icon",
    "nuxt-shiki",
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
    "/api/docs/**": {
      cors: true,
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    },
    "/llms.txt": {
      cors: true,
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    },
    "/llms-full.txt": {
      cors: true,
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
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

  shiki: {
    bundledThemes: ["nord", "one-light"],
    bundledLangs: ["bash", "vue", "typescript", "javascript", "json"],
    defaultTheme: "one-light",
  },

  icon: {
    // Bundle icons at build time for Cloudflare compatibility
    clientBundle: {
      // Explicitly list critical icons to ensure they're bundled
      icons: [
        "fa6-brands:github",
        "heroicons:moon-solid",
        "heroicons:sun-solid",
        "heroicons:arrow-right",
        "heroicons:arrow-left-circle",
        "heroicons:arrow-right-circle",
        "heroicons:arrow-up",
        "heroicons:hashtag",
        "heroicons:information-circle-solid",
        "lucide:terminal",
        "logos:nuxt-icon",
        "logos:nextjs-icon",
        "logos:vue",
        "logos:react",
        "logos:svelte-icon",
        "logos:solidjs-icon",
        "logos:nodejs-icon",
      ],
      // Automatically scan components to detect additional used icons
      scan: true,
      // Size limit to prevent bundle bloat (increased from 200)
      sizeLimitKb: 512,
    },
    // Configure server bundle for Cloudflare edge runtime
    serverBundle: {
      // Use 'auto' mode which will use remote for serverless/edge environments
      mode: "auto",
    },
    // Provider setting to ensure proper behavior
    provider: "iconify",
  },

  devtools: { enabled: true },
  compatibilityDate: "2024-11-14",
});