<template>
  <Example>
    <ExampleInputs class="flex max-md:flex-col gap-2">
      <FormInput v-model="value" label="Date" type="datetime-local" />
    </ExampleInputs>
    <ExampleCode :code="formattedCode" />
    <ExampleResult>
      {{ isPast(value) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
import { isPast } from 'usemods'

const value = ref('2020-01-01T12:00')

const formattedCode = computed(() =>
  generateFormatterCode('isPast', value.value),
)
</script>
