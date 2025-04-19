<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">

const { data: introLinks, error: introError } = await useAsyncData('intro-links', (): Promise<any[]> => {
  return queryCollection('intro').all()
}, {
  default: () => [],
  transform: (result) => {
    if (!result) return []
    return result
  }
})

const { data: docLinks, error: docError } = await useAsyncData('doc-links', (): Promise<any[]> => {
  return queryCollection('docs').all()
}, {
  default: () => [],
  transform: (result) => {
    if (!result) return []
    return result
  }
})

onBeforeMount(() => {
  addDeviceClasses()
})

provide('intro-links', introLinks.value)
provide('doc-links', docLinks.value)
</script>
