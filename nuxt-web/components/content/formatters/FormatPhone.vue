<template>
  <Example>
    <ExampleInputs>
      <FormInput
        v-model="phone"
        label="Phone"
        type="text" />
      <FormInput
        v-model="pattern"
        label="Pattern"
        type="text"
        info="Optional. Use # for digits" />
    </ExampleInputs>
    <ExampleCode :code="pattern ? `formatPhone('${phone}', { pattern: '${pattern}' })` : `formatPhone('${phone}')`" />
    <ExampleResult>
      {{ pattern ? formatPhone(phone, { pattern }) : formatPhone(phone) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const phone = ref('5551234567')
const pattern = ref('')
</script>
