<template>
  <Example>
    <ExampleInputs>
      <FormNumber v-model="length" label="Length" :max="36" />
    </ExampleInputs>
    <ExampleCode :code="`generateShortId(${length})`" />
    <ExampleResult>
      {{ generateShortId(length) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const length = ref(36);
</script>
