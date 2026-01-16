<template>
  <Example>
    <ExampleInputs class="flex gap-2">
      <FormNumber v-model="length" label="Length" :min="1" />
      <Button color="secondary" @click="result = generateNumber(length)">
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
const length = ref(8);
const result = ref(0);

onMounted(() => {
  result.value = generateNumber(length.value);
});
</script>
