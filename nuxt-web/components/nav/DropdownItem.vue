<template>
  <NuxtLink
    :to="to"
    prefetch
    class="inline-flex items-start gap-3 rounded-lg border border-transparent px-4 py-2.5 text-gray-500 transition-all hover:border-indigo-200 hover:bg-indigo-50 dark:text-white dark:hover:border-white/10 dark:hover:bg-white/5 md:text-lg">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  to: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
@reference "~/assets/css/tailwind.css";

  :deep(svg) {
    @apply text-gray-500;
  }
</style>
