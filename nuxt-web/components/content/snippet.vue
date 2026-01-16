<template>
  <ClientOnly>
    <Shiki :key="`shiki-${shikiTheme}-${code.length}`" :lang="shikiLang" :code="code" :theme="shikiTheme" />
    <template #fallback>
      <pre class="shiki-fallback"><code>{{ code }}</code></pre>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const props = defineProps<{
  lang: string
  code: string
}>()

const colorMode = useColorMode()
const shikiLang = computed(() => props.lang as any)

// Track dark mode state
const isDark = ref(false)
const themeKey = ref(0)

onMounted(() => {
  // Initial check
  isDark.value = document.documentElement.classList.contains('dark')

  // Watch for class changes on the html element
  const observer = new MutationObserver(() => {
    const newIsDark = document.documentElement.classList.contains('dark')
    if (newIsDark !== isDark.value) {
      isDark.value = newIsDark
      themeKey.value++ // Force re-render
    }
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })

  onUnmounted(() => {
    observer.disconnect()
  })
})

// Also watch colorMode for reactivity
watch(() => colorMode.value, (newValue) => {
  if (typeof document !== 'undefined') {
    const newIsDark = document.documentElement.classList.contains('dark')
    if (newIsDark !== isDark.value) {
      isDark.value = newIsDark
      themeKey.value++ // Force re-render
    }
  } else {
    const newIsDark = newValue === 'dark'
    if (newIsDark !== isDark.value) {
      isDark.value = newIsDark
      themeKey.value++ // Force re-render
    }
  }
}, { immediate: true })

const shikiTheme = computed(() => isDark.value ? 'nord' : 'one-light')
</script>
<style scoped>
.shiki-fallback {
  @apply rounded-lg bg-gray-100 dark:bg-gray-800 p-4 overflow-x-auto;
}

.shiki-fallback code {
  @apply text-sm font-mono;
}

/* Make Shiki background transparent - comprehensive targeting */
:deep(pre),
:deep(pre.shiki),
:deep(.shiki),
:deep([class*="shiki"]) {
  background: transparent !important;
  background-color: transparent !important;
}

:deep(pre code),
:deep(pre.shiki code),
:deep(.shiki code),
:deep([class*="shiki"] code) {
  background: transparent !important;
  background-color: transparent !important;
}

/* Target all nested elements within Shiki */
:deep([class*="shiki"] *),
:deep(pre.shiki *) {
  background: transparent !important;
  background-color: transparent !important;
}
</style>
