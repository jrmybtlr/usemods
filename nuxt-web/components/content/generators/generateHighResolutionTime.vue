<template>
  <Example>
    <ExampleInputs>
      <Button @click="result = generateHighResolutionTime().toString()" color="secondary">Generate</Button>
    </ExampleInputs>
    <ExampleResult>
      {{ result }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const result = ref('')
</script>