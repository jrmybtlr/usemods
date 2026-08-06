<template>
  <Example>
    <ExampleInputs
      class="flex gap-2"
      class:max-md="flex-col">
      <FormInput
        v-model="a"
        label="Date A"
        type="datetime-local" />
      <FormInput
        v-model="b"
        label="Date B"
        type="datetime-local" />
    </ExampleInputs>
    <ExampleCode :code="formattedCode" />
    <ExampleResult>
      {{ isSameMonth(a, b) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
import { isSameMonth } from 'usemods'

const a = ref('2025-06-01T08:00')
const b = ref('2025-06-28T20:00')

const formattedCode = computed(() =>
  generateFormatterCode('isSameMonth', [a.value, b.value]),
)
</script>
