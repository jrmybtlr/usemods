<template>
  <DocsLayout>
    <PageTitle>
      <h1>Installation</h1>
      <p>Running and loving mods</p>
    </PageTitle>

    <div class="prose prose-lg dark:prose-invert max-w-none">
      <p>To install, simply run the following command in your terminal:</p>
      
      <Shiki lang="bash" code="# Using npm
npm install usemods

# Wrangling yarn
yarn add usemods

# Trying bun
bun add usemods" />

      <h2>Nuxt</h2>
      <p>If you are using Nuxt, you can add the module to your nuxt.config.js automagically. We're actively working on composables and other Nuxt-specific features, so stay tuned!</p>

      <Shiki lang="bash" code="npx nuxi module add usemods-nuxt" />

      <h2>Next</h2>
      <p>If you are using Next.js, you can add the module to your next.config.js automagica....just kidding. Next.js doesn't have modules. <strong>Live with your choices.</strong></p>

      <h2>Usage</h2>
      <p>Once you've installed the package, you can import the functions as you need. We'll add better examples in the future, but hopefully your familiar with the basics.</p>
      
      <Shiki lang="vue" code="<!-- Vue -->
<template>
  <div>
    {{ formatNumber(123456789) }}
  </div>
  <button @click=&quot;copyToClipboard('Hello, world!')&quot;>
    Copy to clipboard
  </button>
</template>

<script setup>
  import { copyToClipboard, formatNumber } from 'usemods'
</script>" />
    </div>
  </DocsLayout>
</template>

<script setup lang="ts">
import DocsLayout from '~/components/DocsLayout.vue'
import PageTitle from '~/components/content/PageTitle.vue'
import Shiki from '~/components/content/snippet.vue'

provide('toc', [])
</script>

