<template>
  <div v-if="data?.prev || data?.next" class="mt-12 flex gap-4 text-balance">
    <NuxtLink
      v-if="data?.prev"
      prefetch
      :to="data?.prev._path"
      class="flex flex-1 flex-col items-start gap-3 rounded-lg border p-5 text-left transition-all dark:border-white/10 dark:hover:bg-white/5"
    >
      <Icon name="heroicons:arrow-left-circle" class="size-6 opacity-30" />
      <div class="text-lg">
        {{ data?.prev.title }}
      </div>
      <div v-if="data?.prev.lead" class="text-sm dark:text-white/50">
        {{ data?.prev.lead }}
      </div>
    </NuxtLink>
    <NuxtLink
      v-if="data?.next"
      prefetch
      :to="data?.next._path"
      class="flex flex-1 flex-col items-end gap-3 rounded-lg border p-5 text-right transition-all dark:border-white/10 dark:hover:bg-white/5"
    >
      <Icon name="heroicons:arrow-right-circle" class="size-6 opacity-30" />
      <div class="text-lg">
        {{ data?.next.title }}
      </div>
      <div v-if="data?.next.lead" class="text-sm dark:text-white/50">
        {{ data?.next.lead }}
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { introLinks, docLinks } from "~/utils/navigation";

const route = useRoute();

// Build navigation array from intro and doc links
const allLinks = [...introLinks, ...docLinks];

// Find current link index
const currentIndex = computed(() => {
  return allLinks.findIndex((link) => link.path === route.path);
});

// Get previous and next links
const data = computed(() => {
  const prev = currentIndex.value > 0 ? allLinks[currentIndex.value - 1] : null;
  const next =
    currentIndex.value < allLinks.length - 1
      ? allLinks[currentIndex.value + 1]
      : null;

  return {
    prev: prev ? { _path: prev.path, title: prev.title, lead: "" } : null,
    next: next ? { _path: next.path, title: next.title, lead: "" } : null,
  };
});
</script>
