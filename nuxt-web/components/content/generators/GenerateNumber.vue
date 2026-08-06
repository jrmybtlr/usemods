<template>
  <Example>
    <ExampleInputs class="flex gap-2">
      <FormNumber
        v-model="length"
        label="Length"
        :min="1" />
      <Button
        color="secondary"
        @click="generate">
        Generate
      </Button>
    </ExampleInputs>
    <ExampleCode :code="`generateNumber(${length})`" />
    <ExampleResult>
      {{ result }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const length = ref(8)
const result = useState('demo-generateNumber', () => String(generateNumber(length.value)))

function generate() {
  result.value = String(generateNumber(length.value))
}
</script>
