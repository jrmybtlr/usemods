<template>
  <Example>
    <ExampleInputs>
      <FormInput
        v-model="shortUuid"
        label="Short UUID" />
    </ExampleInputs>
    <ExampleCode :code="`decodeShortUuid(${shortUuid})`" />
    <ExampleResult>
      {{ decodeShortUuid(shortUuid) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const shortUuid = ref('Lt7bEcatSvm81jCJajLItA')
</script>
