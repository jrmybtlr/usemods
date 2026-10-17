<template>
  <Example>
    <ExampleInputs>
      <FormInput
        v-model.number="value"
        label="Value"
        type="text" />
      <FormInput
        v-model.number="min"
        label="Min"
        type="text" />
      <FormInput
        v-model.number="max"
        label="Max"
        type="text" />
    </ExampleInputs>
    <ExampleCode :code="`clamp(${value}, ${min}, ${max})`" />
    <ExampleResult>
      {{ clamp(value, min, max) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
import { clamp } from 'usemods'

const value = ref(15)
const min = ref(0)
const max = ref(10)
</script>
