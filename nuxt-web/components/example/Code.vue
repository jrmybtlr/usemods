<template>
  <div
    class="flex items-center justify-between gap-6 overflow-hidden bg-white px-5 py-4"
    class:max-md="flex-col"
    class:dark="bg-white/[3%]">
    <div
      class="flex items-center gap-3"
      class:max-md="text-center">
      <div
        class="flex size-5 shrink-0 items-center justify-center rounded-full bg-indigo-50"
        class:max-md="hidden"
        class:dark="bg-white/5">
        <Icon
          name="ph:code-bold"
          class="w-3 shrink-0 text-indigo-600"
          class:dark="text-white/50" />
      </div>
      <div
        class="font-mono text-sm text-pretty text-gray-500"
        class:dark="text-white/50">
        {{ code }}
      </div>
    </div>
    <Button
      color="secondary"
      size="sm"
      class:max-md="h-12 w-full"
      class:md="w-24"
      @click="copyToClipboard(props.code), copied()">
      <Icon
        v-if="!showCopied"
        name="heroicons:square-2-stack"
        class="size-3" />
      <span class="text-sm/none">
        <span v-if="showCopied">Copied!</span>
        <span v-else>Copy</span>
      </span>
    </Button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  code: string
}>()

const formattedCode = computed(() => formatCode(props.code))
const showCopied = ref(false)

function copied() {
  showCopied.value = true
  setTimeout(() => {
    showCopied.value = false
  }, 800)
}

// function formatCode(input: string) {
//   const regex = /(\b\d+(\.\d+)?\b|(\b\w+\b):\s*'[^']*'|\b\w+\b:\s*\b[\w.-]+\b)/g
//   const result = input.replace(regex, match => `<span class="option">${match}</span>`)
//   return result
// }
</script>

<style scoped>
@reference "~/assets/css/tailwind.css";

:deep(.option) {
  @apply text-base underline decoration-indigo-200 dark:decoration-white/10 underline-offset-[6px] decoration-dashed text-indigo-500 dark:text-white inline-flex;
}
</style>
