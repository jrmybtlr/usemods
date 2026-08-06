<template>
  <Example>
    <ExampleInputs>
      <FormNumber
        v-model="length"
        label="Max"
        :min="1" />
      <Button
        color="secondary"
        @click="generate">
        Generate
      </Button>
    </ExampleInputs>
    <ExampleCode :code="`generateRandomIndex(${length})`" />
    <ExampleResult>
      {{ result }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const length = ref(120)
const result = useState('demo-generateRandomIndex', () => String(generateRandomIndex(length.value)))

function generate() {
  result.value = String(generateRandomIndex(length.value))
}
</script>
