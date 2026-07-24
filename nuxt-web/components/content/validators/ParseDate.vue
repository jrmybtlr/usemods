<template>
  <Example>
    <ExampleInputs>
      <FormInput
        v-model="value"
        label="Value"
        type="text" />
    </ExampleInputs>
    <ExampleResult>
      {{ parseDate(value) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
import { parseDate } from 'usemods'

const value = ref('2024-01-01')
</script>
