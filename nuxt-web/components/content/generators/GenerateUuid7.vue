<template>
  <Example>
    <ExampleInputs>
      <Button
        color="secondary"
        @click="generate">
        Generate
      </Button>
    </ExampleInputs>
    <ExampleResult>
      {{ result }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const result = useState('demo-generateUuid7', () => generateUuid7())

function generate() {
  result.value = generateUuid7()
}
</script>
