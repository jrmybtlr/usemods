import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import tailwindcss from "@tailwindcss/vite";

const nuxtWebDir = fileURLToPath(new URL(".", import.meta.url));
const repoRoot = resolve(nuxtWebDir, "..");
const ignoredWatchPaths = [
  resolve(repoRoot, "node_modules"),
  resolve(repoRoot, "dist"),
  resolve(repoRoot, "docs"),
  resolve(repoRoot, ".git"),
  resolve(repoRoot, "nuxt-module"),
];

async function generateAiDiscoveryAssets(): Promise<void> {
  const generatorPath = resolve(import.meta.dirname, "../docs/generate-ai-docs.mjs");
  const generator = await import(pathToFileURL(generatorPath).href) as {
    generateAiDiscoveryAssets: () => Promise<void>;
  };
  await generator.generateAiDiscoveryAssets();
}

export default defineNuxtConfig({
  experimental: {
    viteEnvironmentApi: false,
  },

  watchers: {
    chokidar: {
      // Ensure Nuxt's own file watching also uses polling to avoid EMFILE on macOS.
      usePolling: true,
      ignored: ignoredWatchPaths,
    },
  },

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias:
        process.env.NODE_ENV === "development"
          ? {
              // In this monorepo, `usemods` is linked via pnpm and points at the
              // prebuilt `dist/` bundle. That bundle can break Vite transforms
              // during dev (e.g. duplicate symbol errors). Use source instead.
              usemods: resolve(repoRoot, "src/index.ts"),
            }
          : {},
    },
    server: {
      fs: {
        // pnpm workspaces often resolve deps from the repo root `node_modules/`,
        // which is outside the Nuxt app root (`nuxt-web/`). Allow Vite to serve
        // those files so `@fs/.../node_modules/...` imports don't 403.
        allow: [repoRoot],
      },
      watch: {
        // macOS can hit the per-process file watcher limit (EMFILE) in large
        // workspaces. Polling avoids consuming one file descriptor per watcher.
        usePolling: true,
        ignored: ignoredWatchPaths,
      },
    },
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

  // Keep llms.txt / markdown corpus / sitemap fresh on every website build
  hooks: {
    "build:before": async () => {
      await generateAiDiscoveryAssets();
    },
  },

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