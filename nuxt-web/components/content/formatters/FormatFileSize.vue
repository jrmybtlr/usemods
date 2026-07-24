<template>
  <Example>
    <ExampleInputs class="flex flex-col items-stretch gap-4">
      <div class="flex gap-4 max-md:flex-col">
        <FormInput
          v-model.number="number"
          label="Number"
          type="number" />
        <FormNumber
          v-model="decimals"
          label="Decimals"
          :min="0"
          :max="20" />

        <FormSelectLocale v-model="locale" />

        <FormSelect
          v-model="display"
          label="Display"
          info="Default: 'short'">
          <option value="long">
            Long
          </option>
          <option value="short">
            Short
          </option>
        </FormSelect>
      </div>

      <div class="flex gap-4 max-md:flex-col">
        <FormSelect
          v-model="inputUnit"
          label="Input Unit">
          <option
            v-for="[unit] in bytesInUnit"
            :key="unit"
            :value="unit">
            {{ unit }}
          </option>
        </FormSelect>
        <FormSelect
          v-model="outputUnit"
          label="Output Unit"
          info="Default: 'auto'">
          <option value="auto">
            auto
          </option>
          <option
            v-for="[unit] in bytesInUnit"
            :key="unit"
            :value="unit">
            {{ unit }}
          </option>
        </FormSelect>
      </div>
    </ExampleInputs>

    <ExampleCode :code="formattedCode" />

    <ExampleResult>
      {{ formatFileSize(number, { inputUnit, outputUnit, decimals: decimals || decimals === 0 ? decimals : undefined, display, locale: locale ? locale : undefined }) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const number = ref(1024)
const inputUnit = ref('byte')
const outputUnit = ref('auto')
const decimals = ref(null)
const locale = ref('')
const display = ref<'short' | 'long'>('short')

const formattedCode = computed(() => {
  return generateFormatterCode('formatFileSize', number.value, {
    inputUnit: inputUnit.value,
    outputUnit: outputUnit.value,
    decimals: decimals.value,
    display: display.value,
    locale: locale.value,
  }, {
    inputUnit: 'byte',
    outputUnit: 'auto',
    unitDisplay: 'short',
  })
})
</script>
