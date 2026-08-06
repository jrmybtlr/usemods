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
const result = useState('demo-generateUuid4', () => generateUuid4())

function generate() {
  result.value = generateUuid4()
}
</script>
