import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  experimental: {
    viteEnvironmentApi: false,
  },

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "@nuxt/eslint",
    "@nuxt/icon",
    "nuxt-shiki",
    "usemods-nuxt",
  ],

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "UseMods",
      meta: [
        {
          name: "description",
          content:
            "Zero-dependency JavaScript utilities for frontend and SSR — formatters, validators, generators, modifiers, and browser helpers.",
        },
        { property: "og:image", content: "/og-image.jpg" },
        { name: "robots", content: "index, follow, max-snippet:-1" },
        { name: "ai-content", content: "index" },
      ],
      link: [
        { rel: "alternate", type: "text/plain", href: "/llms.txt", title: "LLMs.txt" },
        { rel: "alternate", type: "text/plain", href: "/llms-full.txt", title: "LLMs full documentation" },
        { rel: "alternate", type: "text/markdown", href: "/docs/all.md", title: "Documentation (Markdown)" },
        { rel: "sitemap", href: "/sitemap.xml", type: "application/xml" },
      ],
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
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
    "/llms-full.txt": {
      cors: true,
      headers: {
        "Cache-Control": "public, max-age=3600",
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
    "/robots.txt": {
      headers: {
        "Cache-Control": "public, max-age=3600",
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  },

  image: {
    cloudflare: {
      baseURL: "https://public.usemods.com/",
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

  // postcss: {
  //   plugins: {
  //     autoprefixer: {},
  //   },
  // },

  shiki: {
    bundledThemes: ["nord", "one-light"],
    bundledLangs: ["bash", "vue", "typescript", "javascript", "json"],
    defaultTheme: "one-light",
  },

  icon: {
    clientBundle: {
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
      scan: true,
      sizeLimitKb: 512,
    },
    serverBundle: {
      remote: true,
    },
    provider: "iconify",
  },

  devtools: { enabled: true },
  compatibilityDate: "2024-11-14",
});