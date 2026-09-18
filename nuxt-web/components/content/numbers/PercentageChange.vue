<template>
  <Example>
    <ExampleInputs>
      <FormInput
        v-model.number="from"
        label="From"
        type="text" />
      <FormInput
        v-model.number="to"
        label="To"
        type="text" />
    </ExampleInputs>
    <ExampleCode :code="`percentageChange(${from}, ${to})`" />
    <ExampleResult>
      {{ percentageChange(from, to) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const from = ref(100)
const to = ref(150)
</script>
