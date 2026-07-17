<template>
  <DocsLayout>
    <PageTitle>
      <h1>Tailwind</h1>
      <p>Utilities to use our utilities with their utilities</p>
    </PageTitle>

  </DocsLayout>
</template>

<script setup lang="ts">
import DocsLayout from '~/components/DocsLayout.vue'
import PageTitle from '~/components/content/PageTitle.vue'
import PageFunction from '~/components/content/PageFunction.vue'

const toc = []
const pageId = 'tailwind'

provide('toc', toc)
provide('pageId', pageId)
</script>
