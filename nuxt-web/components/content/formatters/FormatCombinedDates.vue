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
      <FormCheckbox
        v-model="includeTime"
        label="Include Time"
        info="Show time when dates are the same" />
    </ExampleInputs>
    <ExampleCode :code="formattedCode" />
    <ExampleResult>
      {{ formatCombinedDates(from, to, { locale: locale ? locale : undefined, format: format, includeTime: includeTime }) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const from = ref('2025-01-01T10:00:00')
const to = ref('2025-01-01T14:30:00')
const locale = ref<string | null>(null)
const format = ref<'short' | 'long'>('short')
const includeTime = ref(true)

// Demo Purposes Only
const formattedCode = computed(() => {
  const options = {
    locale: locale.value,
    format: format.value,
    includeTime: includeTime.value
  }
  
  return generateFormatterCode('formatCombinedDates', [from.value, to.value, options])
})
</script>
