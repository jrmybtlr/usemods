<template>
  <Example>
    <ExampleInputs>
      <FormInput
        v-model="from"
        label="From"
        type="date" />
      <FormInput
        v-model="to"
        label="To"
        type="date" />
      <FormSelectLocale v-model="locale" />
      <FormSelect
        v-model="format"
        info="Default: 'short'"
        label="Format">
        <option value="short">
          Short
        </option>
        <option value="long">
          Long
        </option>
      </FormSelect>
    </ExampleInputs>
    <ExampleCode :code="formattedCode" />
    <ExampleResult>
      {{ formatCombinedDates(from, to, { locale: locale ? locale : undefined, format: format }) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const from = ref('2025-01-01')
const to = ref('2025-03-31')
const locale = ref<string | null>(null)
const format = ref<'short' | 'long'>('short')

const formattedCode = computed(() => {
  return generateFormatterCode('formatCombinedDates', from.value, to.value, {
    locale: locale.value,
    format: format.value,
  })
})
</script>
