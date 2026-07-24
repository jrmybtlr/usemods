<template>
  <div v-bind="passthroughAttrs" :class="rootClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()

const defaultClass = 'flex items-end justify-stretch gap-4 max-md:flex-col'

const passthroughAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})

const rootClass = computed(() => {
  const extra = attrs.class
  // Consumer class fully replaces the default flex layout so stacked demos
  // are not fighting `items-end` / row direction from the defaults.
  if (typeof extra === 'string' && extra.trim()) {
    return ['p-5 pb-6', extra]
  }
  if (Array.isArray(extra) && extra.length > 0) {
    return ['p-5 pb-6', ...extra]
  }
  if (extra && typeof extra === 'object' && Object.keys(extra as object).length > 0) {
    return ['p-5 pb-6', extra]
  }
  return ['p-5 pb-6', defaultClass]
})
</script>
