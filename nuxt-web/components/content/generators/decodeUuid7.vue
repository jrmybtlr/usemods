<template>
  <Example>
    <ExampleInputs>
      <FormInput
        v-model="uuid"
        label="UUID" />
      <Button
        color="secondary"
        @click="decode">
        Decode
      </Button>
    </ExampleInputs>
    <ExampleResult>
      {{ result }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const uuid = ref('01950636-e549-7660-92b3-6ca21fbdd611')
const result = ref('')

function decode() {
  result.value = decodeUuid7(uuid.value)
}

onMounted(() => {
  decode()
})
</script>
