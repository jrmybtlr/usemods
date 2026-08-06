<template>
  <div class="flex items-center gap-6">
    <button
      type="button"
      aria-label="Toggle theme"
      class="relative flex size-8 overflow-hidden rounded-md border border-gray-200 p-[8px]"
      class:dark="border-white/20"
      @click="toggle">
      <div
        class="absolute flex flex-col items-center justify-center gap-3 transition-all duration-500"
        :class="{
          'rotate-0': colorMode.value === 'dark',
          'rotate-180': colorMode.value === 'light',
        }">
        <Icon
          name="heroicons:moon-solid"
          class="size-3.5 text-gray-300"
          class:dark="text-white" />
        <Icon
          name="heroicons:sun-solid"
          class="size-3.5 text-amber-500" />
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

function toggle() {
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
}
</script>
