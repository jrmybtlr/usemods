<template>
  <Example>
    <ExampleInputs class="flex max-md:flex-col gap-2">
      <FormInput v-model="a" label="Date A" type="datetime-local" />
      <FormInput v-model="b" label="Date B" type="datetime-local" />
    </ExampleInputs>
    <ExampleCode :code="formattedCode" />
    <ExampleResult>
      {{ isSameDay(a, b) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
import { isSameDay } from 'usemods'

const a = ref('2025-06-15T08:00')
const b = ref('2025-06-15T20:00')

const formattedCode = computed(() =>
  generateFormatterCode('isSameDay', [a.value, b.value]),
)
</script>
