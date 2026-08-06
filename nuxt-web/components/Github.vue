<template>
  <div class="flex">
    <NuxtLink
      to="https://github.com/LittleFoxCompany/usemods"
      target="_blank"
      aria-label="View on GitHub"
      alt="View on GitHub"
      class="flex h-8 items-center gap-2 rounded-lg border border-gray-200 px-2"
      class:dark="border-white/20">
      <Icon
        name="fa6-brands:github"
        class="size-4"
        class:dark="text-white" />
      <!-- <span v-if="data?.stargazers_count" class="text-sm">
        {{ formatNumber(data?.stargazers_count, false) }}
      </span> -->
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
// const data = await useFetch('https://api.github.com/repos/LittleFoxCompany/usemods', {
//   method: 'GET',
//   responseType: 'text',
//   immediate: true
// })
</script>
