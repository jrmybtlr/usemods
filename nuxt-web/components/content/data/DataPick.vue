<template>
  <Example>
    <ExampleInputs class="flex flex-col">
      <FormData :data="value" />
    </ExampleInputs>
    <ExampleInputs>
      <FormSelect
        v-model="key"
        label="Pick">
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
    <ExampleCode :code="`dataPick(${JSON.stringify(value)}, '${key}')`" />
    <ExampleResult>
      {{ dataPick(value, key) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
import { dataPick } from 'usemods'

const key = ref('name')
const value = {
  name: 'John',
  age: 25,
  country: 'USA',
}
</script>
