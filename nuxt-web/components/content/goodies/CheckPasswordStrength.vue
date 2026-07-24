<template>
  <Example>
    <ExampleInputs>
      <FormInput
        v-model="value"
        type="text"
        label="Password" />
    </ExampleInputs>
    <ExampleInputs>
      <FormNumber
        v-model="length"
        label="Length"
        :min="1"
        info="Min 8" />
      <FormNumber
        v-model="uppercase"
        label="Uppercase"
        :min="0"
        info="Min 1" />
      <FormNumber
        v-model="numbers"
        label="Numbers"
        :min="0"
        info="Min 1" />
      <FormNumber
        v-model="symbols"
        label="Symbols"
        :min="0"
        info="Min 1" />
    </ExampleInputs>
    <ExampleCode :code="`checkPasswordStrength('${value}', { length: ${length}, uppercase: ${uppercase}, numbers: ${numbers}, symbols: ${symbols} })`" />
    <ExampleResult>
      {{ checkPasswordStrength(value, { length, uppercase, numbers, symbols }) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const value = ref('Pa$$-w0rD!')
const length = ref(8)
const uppercase = ref(1)
const numbers = ref(1)
const symbols = ref(1)
</script>
