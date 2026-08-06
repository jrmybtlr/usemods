<template>
  <Example>
    <ExampleInputs>
      <FormNumber
        v-model="length"
        label="Length"
        :max="36" />
      <Button
        color="secondary"
        @click="generate">
        Generate
      </Button>
    </ExampleInputs>
    <ExampleCode :code="`generateShortId(${length})`" />
    <ExampleResult>
      {{ result }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const length = ref(36)
const result = useState('demo-generateShortId', () => generateShortId(length.value))

function generate() {
  result.value = generateShortId(length.value)
}
</script>
