<template>
  <Example>
    <ExampleInputs>
      <FormData :data="value" />
    </ExampleInputs>
    <ExampleInputs>
      <FormSelect v-model="property">
        <option value="name">
          Name
        </option>
        <option value="age">
          Age
        </option>
      </FormSelect>
      <FormSelect v-model="order">
        <option value="asc">
          Asc
        </option>
        <option value="desc">
          Desc
        </option>
      </FormSelect>
    </ExampleInputs>
    <ExampleCode :code="`dataSortBy(${JSON.stringify(value)}, { property: '${property}', order: '${order}' })`" />
    <ExampleResult>
      {{ dataSortBy(value, { property, order }) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const property = ref<'name' | 'age'>('name')
const order = ref<'asc' | 'desc'>('asc')
const value = [
  {
    name: 'Keith Richards',
    age: 77,
  },
  {
    name: 'Mick Jagger',
    age: 78,
  },
  {
    name: 'Charlie Watts',
    age: 80,
  },
]
</script>
