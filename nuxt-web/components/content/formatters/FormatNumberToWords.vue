<template>
  <Example>
    <ExampleInputs>
      <FormInput v-model="value" label="Number" type="number" />
    </ExampleInputs>
    <ExampleCode :code="`formatNumberToWords(${value})`" />
    <ExampleResult>
      {{ formatNumberToWords(Number(value)) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const value = ref(1234567)
</script>
