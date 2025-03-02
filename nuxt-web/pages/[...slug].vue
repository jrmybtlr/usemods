<template>
  <main>
    <!-- Navigation -->
    <NavMainNavigation />

    <!-- Pages -->
    <div class="container relative mx-auto flex min-h-screen gap-8 py-2 max-md:flex-col md:gap-12 md:py-12">
      <div class="top-6 flex h-fit w-full flex-col max-md:hidden md:sticky md:-mt-2 md:w-2/12">
        <NuxtLink
          v-for="link in introLinks"
          :key="link.title"
          prefetch
          :to="link._path"
          class="flex items-center gap-3 py-2 text-xl font-medium text-gray-500 dark:text-gray-500 dark:hover:text-white/75"
          active-class="active">
          <Icon
            :name="link.title"
            class="size-5 shrink-0" />
          {{ link.title }}
        </NuxtLink>

        <div class="mt-8 flex flex-col gap-1">
          <NuxtLink
            v-for="link in docLinks"
            :key="link.title"
            prefetch
            :to="link._path"
            class="flex items-center gap-3 py-2 font-medium text-gray-500 dark:text-gray-500 dark:hover:text-white/75"
            active-class="active">
            <Icon
              :name="link.title"
              class="size-5 shrink-0" />
            {{ link.title }}
          </NuxtLink>
        </div>
      </div>

      <!-- Content -->
      <div
        class="min-h-screen w-full text-gray-950 dark:text-white lg:w-7/12"
        :class="route.params.slug ?? null">
        <ContentDoc
          class="flex w-full grow flex-col" />

        <!-- Jagger Swagger -->
        <Jagger v-if="route.fullPath === '/docs/actions'" />

        <!-- PrevNext -->
        <LazyPrevNext />
      </div>

      <!-- Table of Contents -->
      <TableOfContents class="sticky top-8 h-fit shrink max-lg:hidden max-md:hidden" />
    </div>
  </main>
</template>

<script setup lang="ts">
// Add type definitions
interface NavLink {
  title: string;
  _path: string;
}

const route = useRoute()
const introLinks = inject<NavLink[]>('intro-links', [])
const docLinks = inject<NavLink[]>('doc-links', [])
</script>

<style scoped>
  .active {
    @apply text-indigo-600 dark:text-amber-400;
  }
</style>
