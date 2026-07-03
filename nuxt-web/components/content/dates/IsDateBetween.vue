<template>
  <Example>
    <ExampleInputs class="flex flex-col gap-2">
      <FormInput v-model="value" label="Date" type="datetime-local" />
      <div class="flex max-md:flex-col gap-2 w-full">
        <FormInput v-model="start" label="Start" type="datetime-local" />
        <FormInput v-model="end" label="End" type="datetime-local" />
      </div>
    </ExampleInputs>
    <ExampleCode :code="formattedCode" />
    <ExampleResult>
      {{ isDateBetween(value, start, end) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
import { isDateBetween } from 'usemods'

const value = ref('2025-06-15T12:00')
const start = ref('2025-06-01T00:00')
const end = ref('2025-06-30T00:00')

const formattedCode = computed(() =>
  generateFormatterCode('isDateBetween', [value.value, start.value, end.value]),
)
</script>
