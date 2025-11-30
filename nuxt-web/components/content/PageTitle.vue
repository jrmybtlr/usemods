<template>
  <div class="md:pb-8">
    <!-- Breadcrumb -->
    <div class="mb-4 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-white/50">
      <div>Docs</div>
      <div>/</div>
      <div
        v-if="pageName"
        class="capitalize">
        {{ pageName }}
      </div>
    </div>
    <div class="text-gray-950 dark:text-white">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// Get page name from route - handle both catch-all and direct routes
const pageName = computed(() => {
  if (route.params.slug && Array.isArray(route.params.slug)) {
    return route.params.slug.at(-1) as string
  }
  // For direct routes like /docs/formatters, extract from pathname
  const pathParts = route.path.split('/').filter(Boolean)
  if (pathParts.length >= 2 && pathParts[0] === 'docs') {
    return pathParts[1]
  }
  if (pathParts.length >= 2 && pathParts[0] === 'intro') {
    return pathParts[1]
  }
  return route.params.slug as string | undefined
})
</script>

<style scoped>
  :deep(p) {
    @apply text-pretty font-light md:text-xl/[1.6em] lg:text-2xl/[1.6em];
  }
</style>
