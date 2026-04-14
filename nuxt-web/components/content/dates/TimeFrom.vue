<template>
  <Example>
    <ExampleInputs class="flex flex-col gap-2">
      <FormInput v-model="value" label="Date" type="datetime-local" />
      <FormInput v-model="now" label='Reference "now" (optional)' type="datetime-local" />
      <div class="flex gap-2 w-full flex-wrap">
        <FormSelectLocale v-model="locale" />
        <FormInput
          v-model.number="nowThresholdSeconds"
          class="max-w-[10rem]"
          label="Now threshold (sec)"
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
const now = ref('2025-06-15T12:00')
const locale = ref('')
const nowThresholdSeconds = ref(30)

function buildOpts() {
  return {
    locale: locale.value || undefined,
    now: now.value || undefined,
    nowThresholdSeconds: nowThresholdSeconds.value,
  }
}

const formattedCode = computed(() =>
  generateFormatterCode('timeFrom', value.value, buildOpts()),
)
</script>
