![Frame 1209](https://public.usemods.com/Nuxt@2x.jpg)

# Use Mods (Nuxt Module)
Auto-imported functions, modifiers, and reactive Vue composables for zippy Nuxt developers.

<!-- Badges -->
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![CI][ci-src]][ci-href]
[![CodeQL][codeql-src]][codeql-href]

[npm-version-src]: https://img.shields.io/npm/v/usemods-nuxt/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/usemods-nuxt

[npm-downloads-src]: https://img.shields.io/npm/d18m/usemods-nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/usemods-nuxt

[license-src]: https://img.shields.io/npm/l/usemods-nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/usemods-nuxt

[ci-src]: https://github.com/LittleFoxCompany/usemods/actions/workflows/ci.yml/badge.svg
[ci-href]: https://github.com/LittleFoxCompany/usemods/actions/workflows/ci.yml

[codeql-src]: https://github.com/LittleFoxCompany/usemods/actions/workflows/github-code-scanning/codeql/badge.svg?branch=main
[codeql-href]: https://github.com/LittleFoxCompany/usemods/actions/workflows/github-code-scanning/codeql

## Quick Setup
```bash
npx nuxi module add usemods-nuxt
```

## What you get

- **Auto-imports** for every export from [`usemods`](https://www.npmjs.com/package/usemods) (`formatNumber`, `slugify`, `detectBreakpoint`, …)
- **Reactive composables** for helpers that need event listeners (SSR-safe defaults until mounted):

| Composable | Wraps |
| --- | --- |
| `useScrollPosition` | `detectScrollPosition` |
| `useMousePosition` | `detectMousePosition` |
| `useRelativeMousePosition` | `detectRelativeMousePosition` |
| `useWindowSize` | `detectWindowSize` |
| `useActiveBrowser` | `detectActiveBrowser` |
| `useColorScheme` | `detectColorScheme` |
| `useBreakpoint` | `detectBreakpoint` |
| `useContainerBreakpoint` | `detectContainerBreakpoint` |
| `useNetworkStatus` | `detectNetworkStatus` |
| `useOrientation` | `isPortrait` / `isLandscape` |

```vue
<script setup>
const breakpoint = useBreakpoint()
const size = useWindowSize()
const { isPortrait, isLandscape } = useOrientation()
</script>
```

### Alias option

Remap auto-imported names via `nuxt.config`:

```ts
export default defineNuxtConfig({
  modules: ['usemods-nuxt'],
  usemods: {
    alias: [
      ['formatNumber', 'fmt'],
    ],
  },
})
```

## AI / coding agents

Docs optimized for agents: [usemods.com/llms.txt](https://usemods.com/llms.txt), [AGENTS.md](../AGENTS.md), and the [AI discovery checklist](../docs/ai-discovery.md).

## Manual Setup

1. Add `usemods-nuxt` dependency to your project


```bash
# Using pnpm
pnpm add -D usemods-nuxt

# Using yarn
yarn add --dev usemods-nuxt

# Using npm
npm install --save-dev usemods-nuxt
```

2. Add `usemods-nuxt` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ["usemods-nuxt"],
})
```

That's it! You've got every mod util (and the reactive composables) in your Nuxt app ✨🛵
