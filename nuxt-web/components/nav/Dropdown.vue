<template>
  <!-- @mouseover="show = true" @mouseleave="show = false" -->
  <div
    ref="dropdown"
    class="group isolate z-50 flex cursor-pointer"
    @click="show = !show">
    <!-- Title -->
    <div class="flex items-center gap-1">
      <span class="text-lg font-semibold">
        {{ label }}
      </span>
      <Icon
        name="heroicons:chevron-down-16-solid"
        class="size-4 text-indigo-400 transition-all"
        :class="show ? 'rotate-180' : 'rotate-0'" />
    </div>

    <!-- Links -->
    <Teleport to="body">
      <div
        v-if="show"
        class="absolute top-16 left-1/2 z-50 flex -translate-x-1/2 rounded-lg border border-black/5 bg-white/80 p-1 shadow-2xl backdrop-blur transition-all duration-300"
        class:dark="border-white/5 bg-zinc-900/95"
        class:max-md="w-[90vw]"
        :class="show ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'">
        <slot />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
})

const dropdown = ref(null)
const show = ref(false)

onClickOutside(dropdown, () => {
  show.value = false
})
</script>
