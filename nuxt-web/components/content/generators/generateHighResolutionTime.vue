<template>
  <Example>
    <ExampleInputs>
      <Button
        color="secondary"
        @click="result = generateHighResolutionTime().toString()">
        Generate
      </Button>
    </ExampleInputs>
    <ExampleResult>
      {{ result }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const result = ref('')
</script>
