<template>
  <Example>
    <ExampleInputs class="flex flex-col">
      <FormData :data="value" />
    </ExampleInputs>
    <ExampleInputs>
      <FormSelect
        v-model="property"
        label="Group by">
        <option value="type">
          Type
        </option>
        <option value="color">
          Color
        </option>
      </FormSelect>
    </ExampleInputs>
    <ExampleCode :code="`dataGroupBy(${JSON.stringify(value)}, '${property}')`" />
    <ExampleResult>
      {{ dataGroupBy(value, property) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const property = ref('type')
const value = [
  { name: 'Apple', type: 'fruit', color: 'red' },
  { name: 'Carrot', type: 'veg', color: 'orange' },
  { name: 'Banana', type: 'fruit', color: 'yellow' },
  { name: 'Broccoli', type: 'veg', color: 'green' },
]
</script>
