
# Installation
To install, simply run the following command in your terminal:
```bash
# Using npm
npm install usemods

# Wrangling yarn
yarn add usemods

# Trying bun
bun add usemods
```

## Nuxt
If you are using Nuxt, you can add the module to your nuxt.config.js automagically. We're actively working on composables and other Nuxt-specific features, so stay tuned!

```bash
npx nuxi module add usemods-nuxt
```

## Next
If you are using Next.js, you can add the module to your next.config.js automagica....just kidding. Next.js doesn't have modules. **Live with your choices.**

## Usage
Once you've installed the package, you can import the functions as you need. We'll add better examples in the future, but hopefully your familiar with the basics.
```vue
<!-- Vue -->
<template>
  <div>
    {{ formatNumber(123456789) }}
  </div>
  <button @click="copyToClipboard('Hello, world!')">
    Copy to clipboard
  </button>
</template>

<script setup>
  import { copyToClipboard, formatNumber } from 'usemods'
</script>
```
