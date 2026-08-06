<template>
  <Example>
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
        label="Number"
        :min="0"
        info="Min 1" />
      <FormNumber
        v-model="symbols"
        label="Special"
        :min="0"
        info="Min 1" />
      <Button
        color="secondary"
        @click="generate">
        Generate
      </Button>
    </ExampleInputs>
    <ExampleCode
      :code="`generatePassword({ length: ${length}, uppercase: ${uppercase}, numbers: ${numbers}, symbols: ${symbols} })`" />
    <ExampleResult>
      {{ result }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const length = ref(16)
const uppercase = ref(1)
const numbers = ref(1)
const symbols = ref(1)
const result = useState('demo-generatePassword', () => generatePassword({
  length: length.value,
  uppercase: uppercase.value,
  numbers: numbers.value,
  symbols: symbols.value,
}))

function generate() {
  result.value = generatePassword({
    length: length.value,
    uppercase: uppercase.value,
    numbers: numbers.value,
    symbols: symbols.value,
  })
}
</script>
