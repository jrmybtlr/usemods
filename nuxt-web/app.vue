<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">

const { data: introLinks } = await useAsyncData('intro-links', (): Promise<any[]> => {
  return queryCollection( 'intro').all()
})

const { data: docLinks } = await useAsyncData('doc-links', (): Promise<any[]> => {
  return queryCollection( 'docs').all()
})

onBeforeMount(() => {
  addDeviceClasses()
})

provide('intro-links', introLinks.value)
provide('doc-links', docLinks.value)
</script>
