<template>
  <Example>
    <ExampleInputs class="flex flex-col">
      <FormData :data="value" />
    </ExampleInputs>
    <ExampleInputs>
      <FormSelect
        v-model="key"
        label="Omit">
        <option value="name">
          Name
        </option>
        <option value="age">
          Age
        </option>
        <option value="country">
          Country
        </option>
      </FormSelect>
    </ExampleInputs>
    <ExampleCode :code="`dataOmit(${JSON.stringify(value)}, '${key}')`" />
    <ExampleResult>
      {{ dataOmit(value, key) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const key = ref('age')
const value = {
  name: 'John',
  age: 25,
  country: 'USA',
}
</script>
