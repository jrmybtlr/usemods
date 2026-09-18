<template>
  <Example>
    <ExampleInputs>
      <FormInput
        v-model="text"
        label="Text"
        type="text" />
      <FormNumber
        v-model="length"
        label="Length"
        :min="1" />
      <FormSelect
        v-model="position"
        label="Position">
        <option value="end">
          End
        </option>
        <option value="start">
          Start
        </option>
        <option value="middle">
          Middle
        </option>
      </FormSelect>
    </ExampleInputs>
    <ExampleCode :code="`truncate('${text}', ${length}, { position: '${position}' })`" />
    <ExampleResult>
      {{ truncate(text, length, { position }) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const text = ref('The quick brown fox jumps over the lazy dog')
const length = ref(20)
const position = ref<'end' | 'start' | 'middle'>('end')
</script>
