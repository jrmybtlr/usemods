<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { introLinks, docLinks } from '~/utils/navigation'

onBeforeMount(() => {
  addDeviceClasses();
});

provide("intro-links", introLinks);
provide("doc-links", docLinks);
</script>
