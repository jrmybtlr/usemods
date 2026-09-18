<template>
  <Example>
    <ExampleInputs>
      <FormInput
        v-model="text"
        label="Text"
        type="text" />
      <FormNumber
        v-model="visibleStart"
        label="Visible Start"
        :min="0" />
      <FormNumber
        v-model="visibleEnd"
        label="Visible End"
        :min="0" />
    </ExampleInputs>
    <ExampleCode :code="`mask('${text}', { visibleStart: ${visibleStart}, visibleEnd: ${visibleEnd} })`" />
    <ExampleResult>
      {{ mask(text, { visibleStart, visibleEnd }) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
import { mask } from 'usemods'

const text = ref('4111111111111111')
const visibleStart = ref(0)
const visibleEnd = ref(4)
</script>
