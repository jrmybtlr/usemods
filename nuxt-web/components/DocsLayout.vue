<template>
  <main>
    <!-- Navigation -->
    <NavMainNavigation />

    <!-- Pages -->
    <div
      class="relative container mx-auto flex min-h-screen gap-8 py-2"
      class:max-md="flex-col"
      class:md="gap-12 py-12">
      <div
        class="top-6 flex h-fit w-full flex-col"
        class:max-md="hidden"
        class:md="sticky -mt-2 w-2/12">
        <NuxtLink
          v-for="link in introLinks"
          :key="link.title"
          prefetch
          :to="link.path"
          class="flex items-center gap-3 py-2 text-xl font-medium text-gray-500 dark:hover:text-white/75"
          class:dark="text-gray-500">
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
            :to="link.path"
            class="flex items-center gap-3 py-2 font-medium text-gray-500 dark:hover:text-white/75"
            class:dark="text-gray-500">
            <Icon
              :name="link.title"
              class="size-5 shrink-0" />
            {{ link.title }}
          </NuxtLink>
        </div>
      </div>

      <!-- Content -->
      <div
        class="motion-preset-focus min-h-screen w-full text-gray-950"
        class:dark="text-white"
        class:lg="w-7/12"
        :class="pageClass">
        <slot />

        <!-- Jagger Swagger -->
        <Jagger v-if="route.fullPath === '/docs/actions'" />
      </div>

      <!-- Table of Contents -->
      <TableOfContents
        class="sticky top-8 h-fit shrink"
        class:max-lg="hidden"
        class:max-md="hidden" />
    </div>
  </main>
</template>

<script setup lang="ts">
interface NavLink {
  title: string
  path: string
}

const route = useRoute()
const introLinks = inject<NavLink[]>('intro-links', [])
const docLinks = inject<NavLink[]>('doc-links', [])

const pageClass = computed((): string => {
  const slug = route.params.slug
  const fromSlug = Array.isArray(slug) ? slug.at(-1) : slug
  if (typeof fromSlug === 'string') return fromSlug
  return typeof route.name === 'string' ? route.name : ''
})
</script>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Prefer router defaults: UseClassy treats static `active-class="…"` as a class attr
   (its lookbehind allows matching after `-`), which baked `active` onto every link. */
.router-link-active {
  @apply text-indigo-600 dark:text-amber-400;
}
</style>
