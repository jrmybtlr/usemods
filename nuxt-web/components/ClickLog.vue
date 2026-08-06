<template>
  <div class="p-6 font-mono text-xs">
    <div>Clicks: {{ clicks }}</div>
    <div class="mt-2">
      Executions: {{ executions }}
    </div>
    <div class="mt-2">
      <div
        v-for="(time, index) in executionLog.slice().reverse()"
        :key="index"
        class="flex items-baseline gap-1 py-1">
        <div class="shrink-0">
          {{ time }}
        </div>
        <div class="w-full rounded-full border-b-2 border-dotted border-gray-500" />
        <div class="flex items-center gap-1 font-bold text-emerald-500">
          <Icon name="heroicons:check" /> SUCCESS
        </div>
      </div>
      <div
        v-if="executions > executionLog.length"
        class="mt-2">
        + {{ executions - executionLog.length }} more...
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  executions: number
  clicks: number
  executionLog: string[]
}>()
</script>
