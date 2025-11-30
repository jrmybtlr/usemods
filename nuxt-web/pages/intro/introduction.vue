<template>
  <DocsLayout>
    <PageTitle>
      <h1>Introduction</h1>
      <p>UseMods is a mighty set of missing functions for your frontend, framework and SSR applications. All the bells, whistles, and scooter mirrors you'll ever need.</p>
    </PageTitle>

    <div class="prose prose-lg dark:prose-invert max-w-none">
      <h3>No Dependencies</h3>
      <p>UseMods don't need nobody! It's a mod rocker, standing tall and proud, with no dependencies to hold it back. Use it with any frontend or SSR framework and rock on!</p>

      <h3>Frontend and SSR</h3>
      <p>Functional programming that's designed to work seamlessly with both client rendered and SSR applications.</p>

      <h3>Opinionated</h3>
      <p>I know you didn't ask, but here's our opinion on best practice, with predictable conventions to follow when building your application.</p>

      <h3>Modularity</h3>
      <p>Pick and choose the functions you need for your application, or bring the whole kitchen sink.</p>

      <h3>Performance</h3>
      <p>Not exactly O(1), but we consider the performance of the people using our functions just as much as the Big O complexity.</p>

      <h3>Edge Functions</h3>
      <p>Compatable with edge function environments, allowing you to mod yourself silly as close to your users as possible.</p>

      <h3>Nuxt Module</h3>
      <p>Easily integrate into your Nuxt application with extra composables that those Next.js folks can only dream of.</p>

      <h2>Why UseMods?</h2>
      <p>While we can't force you to use UseMods, we can certainly tell you why you should. Mods helps will all the little task, functions and fiddly bits you need to build modern web applications. Some are simple, some are complex, but all are designed to make your life 30% more awesome.</p>
    </div>
  </DocsLayout>
</template>

<script setup lang="ts">
import DocsLayout from '~/components/DocsLayout.vue'
import PageTitle from '~/components/content/PageTitle.vue'

provide('toc', [])
</script>

