<template>
  <nav>
    <div
      class="container mx-auto grid grid-cols-3 items-center justify-between py-6 text-gray-800"
      class:dark="text-white">
      <!-- Logo -->
      <NuxtLink
        alt="Home"
        to="/"
        aria-label="Home"
        prefetch>
        <LogoFull
          class="h-6"
          class:max-md="hidden" />
        <LogoMark
          class="h-6"
          class:md="hidden" />
      </NuxtLink>

      <!-- Links -->
      <div
        class="flex grow items-center justify-end gap-4"
        class:md="justify-center gap-6">
        <NavDropdown label="Docs">
          <div class="flex w-full items-stretch gap-3 divide-x divide-white/5 p-1">
            <div class="flex shrink flex-col">
              <NavDropdownItem
                v-for="link in introLinks"
                :key="link.id"
                :to="link.path">
                <Icon
                  :name="link.title"
                  class="mt-1 size-5 shrink-0 text-white/50" />
                <div>
                  {{ link.title }}
                </div>
              </NavDropdownItem>
            </div>
          </div>
        </NavDropdown>

        <NavDropdown label="Functions">
          <div class="flex w-full items-stretch gap-3 divide-x divide-white/5 p-1">
            <div
              class="flex w-fit flex-col"
              class:md="w-[720px]">
              <div
                class="grid grid-cols-2"
                class:md="grid-cols-3">
                <NavDropdownItem
                  v-for="link in docLinks"
                  :key="link.path"
                  :to="link.path">
                  <Icon
                    :name="link.title"
                    class="mt-1 size-5 shrink-0 text-white/50" />
                  <div>
                    {{ link.title }}
                    <div
                      class="truncate text-xs whitespace-nowrap text-gray-500"
                      class:dark="text-white/50"
                      class:max-md="hidden">
                      {{ link.icon || link.lead }}
                    </div>
                  </div>
                </NavDropdownItem>
              </div>
            </div>
          </div>
        </NavDropdown>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-end gap-2">
        <button
          type="button"
          aria-label="Search documentation"
          class="flex h-8 items-center gap-2 rounded-lg border border-gray-200 px-2 text-sm text-zinc-500 transition-colors"
          class:dark="border-white/8 text-zinc-400 hover:text-white"
          class:hover="border-indigo-300 text-indigo-600"
          @click="open">
          <Icon
            name="heroicons:magnifying-glass"
            class="size-4" />
          <span
            class="hidden text-zinc-500"
            class:dark="text-zinc-600"
            class:md="inline">
            Search
          </span>
          <kbd
            class="hidden rounded bg-zinc-100 px-1 py-px text-[10px] text-zinc-400"
            class:md="inline"
            class:dark="bg-white/10">
            {{ shortcutLabel }}
          </kbd>
        </button>
        <!-- <ThemeSwitch /> -->
        <Github />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
interface Link {
  id: string
  path: string
  title: string
  lead: string
  icon?: string
}

const introLinks = inject('intro-links') as Link[] | undefined
const docLinks = inject('doc-links') as Link[] | undefined

const { open } = useCommandPalette()

const shortcutLabel = computed(() => {
  if (import.meta.client && /Mac|iPhone|iPad/.test(navigator.userAgent)) {
    return '⌘K'
  }
  return 'Ctrl K'
})
</script>
