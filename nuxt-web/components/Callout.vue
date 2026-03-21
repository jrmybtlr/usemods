<template>
  <div
    class="flex w-full items-center gap-2 text-pretty rounded-xl border border-indigo-200 bg-indigo-50 p-4 leading-tight text-indigo-600 shadow-xl shadow-indigo-500/5 dark:border-indigo-900/70 dark:bg-indigo-600/10 dark:text-indigo-400">
    <slot />
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

  :deep(code) {
    @apply mx-1 inline rounded-md bg-indigo-700/75 px-1 py-0 font-mono text-sm text-white dark:bg-indigo-600/15 dark:text-indigo-300;
  }
</style>
