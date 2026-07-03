<template>
  <Example>
    <ExampleInputs class="flex max-md:flex-col gap-2">
      <FormInput v-model="value" label="Date" type="datetime-local" />
    </ExampleInputs>
    <ExampleCode :code="formattedCode" />
    <ExampleResult>
      {{ isFuture(value) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
import { isFuture } from 'usemods'

const value = ref('2030-01-01T12:00')

const formattedCode = computed(() =>
  generateFormatterCode('isFuture', value.value),
)
</script>
