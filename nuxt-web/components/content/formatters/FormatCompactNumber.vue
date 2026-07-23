<template>
  <Example>
    <ExampleInputs>
      <FormInput
        v-model="value"
        label="Number"
        type="number" />
      <FormNumber
        v-model="decimals"
        label="Decimals"
        info="Default: 2"
        :min="0"
        :max="20" />
      <FormSelect
        :model-value="trimZeros"
        label="Trim Zeros"
        info="Default: true"
        @update:model-value="(val: string) => trimZeros = val === 'true'">
        <option value="true">
          True
        </option>
        <option value="false">
          False
        </option>
      </FormSelect>
      <FormSelectLocale v-model="locale" />
    </ExampleInputs>
    <ExampleCode :code="formattedCode" />
    <ExampleResult>
      {{ formatCompactNumber(value, { decimals: decimals || decimals === 0 ? decimals : undefined, trimZeros, locale: locale ? locale : undefined }) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
// Explicit import: usemods-nuxt auto-imports only published package exports
import { formatCompactNumber } from 'usemods'

const value = ref(12345678910)
const decimals = ref(null)
const trimZeros = ref(true)
const locale = ref('')

const formattedCode = computed(() => {
  return generateFormatterCode('formatCompactNumber', value.value, {
    decimals: decimals.value,
    trimZeros: trimZeros.value,
    locale: locale.value,
  }, {
    trimZeros: true,
  })
})
</script>
