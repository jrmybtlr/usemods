<template>
  <Example>
    <ExampleInputs class="flex flex-col gap-2">
      <div class="flex gap-2 w-full">
        <FormInput
          v-model="from"
          label="From"
          type="datetime-local" />
      <FormInput
          v-model="to"
          label="To"
          type="datetime-local" />
      </div>
      <div class="flex gap-2 w-full">
        <FormSelectLocale v-model="locale" />
        <FormSelect
          v-model="format"
          info="Default: 'short'"
          label="Format">
          <option value="" disabled selected>
            Select Format
          </option>
          <option value="short">
            Short
          </option>
          <option value="long">
            Long
            </option>
        </FormSelect>
      </div>
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
const locale = ref(undefined)
const format = ref(undefined)


// Demo Purposes Only
const formattedCode = computed(() => {
  return generateFormatterCode('formatCombinedDates', [from.value, to.value], {
    locale: locale.value,
    format: format.value,
  })
})
</script>