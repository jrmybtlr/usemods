<template>
  <Example>
    <ExampleInputs>
      <FormNumber
        v-model="length"
        label="Length"
        :min="1" />
      <FormSelect
        v-model="type"
        label="Type">
        <option value="words">
          Words
        </option>
        <option value="sentences">
          Sentences
        </option>
        <option value="paragraphs">
          Paragraphs
        </option>
      </FormSelect>
      <Button
        color="secondary"
        @click="generate">
        Generate
      </Button>
    </ExampleInputs>
    <ExampleCode :code="`generateLoremIpsum(${length}, { format: '${type}' })`" />
    <ExampleResult>
      {{ result }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const length = ref(2)
const type = ref<'words' | 'sentences' | 'paragraphs'>('words')
const result = useState('demo-generateLoremIpsum', () => generateLoremIpsum(length.value, { format: type.value }))

function generate() {
  result.value = generateLoremIpsum(length.value, { format: type.value })
}
</script>
