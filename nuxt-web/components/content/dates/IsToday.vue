<template>
  <Example>
    <ExampleInputs
      class="flex gap-2"
      class:max-md="flex-col">
      <FormInput
        v-model="value"
        label="Date"
        type="datetime-local" />
    </ExampleInputs>
    <ExampleCode :code="formattedCode" />
    <ExampleResult>
      {{ isToday(value) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
import { isToday } from 'usemods'

const value = ref('2025-06-15T12:00')

const formattedCode = computed(() =>
  generateFormatterCode('isToday', value.value),
)
</script>
