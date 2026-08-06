<template>
  <Example>
    <ExampleInputs>
      <FormInput
        v-model="length"
        type="number"
        label="Length"
        min="1"
        max="100" />
      <Button
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
const length = ref(10)
const result = ref('')

function generate() {
  const array = new Uint8Array(length.value)
  getSecureRandomValues(array)
  result.value = Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('')
}

onMounted(() => {
  nextTick(() => {
    generate()
  })
})
</script>
