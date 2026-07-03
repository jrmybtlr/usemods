<template>
  <Example>
    <ExampleInputs class="flex flex-col gap-2">
      <div class="flex max-md:flex-col gap-2 w-full items-end">
        <FormInput v-model="value" label="Date" type="datetime-local" />
        <FormInput v-model="now" label='Reference "now" (optional)' type="datetime-local" />
      </div>
      <div class="flex max-md:flex-col gap-2 w-full items-end">
        <FormSelectLocale v-model="locale" class="w-full" />
        <FormInput
          v-model.number="threshold"
          class=" w-full"
          label="Threshold (seconds)"
          type="number"
          min="0"
        />
      </div>
    </ExampleInputs>
    <ExampleCode :code="formattedCode" />
    <ExampleResult>
      {{ timeFrom(value, buildOpts()) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
import { timeFrom } from 'usemods'

const value = ref('2025-06-15T12:00')
const now = ref('')
const locale = ref('')
const threshold = ref(30)

function buildOpts() {
  const opts: Record<string, unknown> = {
    locale: locale.value || undefined,
    now: now.value || undefined,
  }
  if (threshold.value !== 30) {
    opts.threshold = threshold.value
  }
  return opts
}

const formattedCode = computed(() =>
  generateFormatterCode('timeFrom', value.value, buildOpts()),
)
</script>
