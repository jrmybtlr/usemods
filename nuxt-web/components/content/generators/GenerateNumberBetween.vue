<template>
  <Example>
    <ExampleInputs>
      <FormInput v-model="min" type="number" label="Min" :min="0" />
      <FormInput v-model="max" type="number" label="Max" />
      <Button
        color="secondary"
        @click="result = generateNumberBetween(min, max)"
      >
        Generate
      </Button>
    </ExampleInputs>
    <ExampleCode :code="`generateNumberBetween(${min}, ${max})`" />
    <ExampleResult>
      {{ result }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const min = ref(1);
const max = ref(10);
const result = ref(0);

onMounted(() => {
  result.value = generateNumberBetween(min.value, max.value);
});
</script>
