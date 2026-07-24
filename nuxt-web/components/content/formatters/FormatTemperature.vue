<template>
  <Example>
    <ExampleInputs class="flex flex-col items-stretch gap-4">
      <div class="flex gap-4 max-md:flex-col">
        <FormInput
          v-model="number"
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
          label="Input Unit"
          info="Default: 'celsius'">
          <option
            v-for="unit in temperatureUnitConversions"
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
            v-for="unit in temperatureUnitConversions"
            :key="unit"
            :value="unit">
            {{ unit }}
          </option>
        </FormSelect>
      </div>
    </ExampleInputs>
    <ExampleCode :code="formattedCode" />
    <ExampleResult>
      {{ formatTemperature(number, { inputUnit, outputUnit, decimals: decimals || decimals === 0 ? decimals : undefined, display, locale: locale ? locale : undefined }) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const number = ref(32)
const inputUnit = ref('celsius')
const outputUnit = ref('auto')
const decimals = ref<number | undefined>(undefined)
const locale = ref<string | undefined>(undefined)
const display = ref<'short' | 'long'>('short')

const temperatureUnitConversions = ref([
  'celsius',
  'fahrenheit',
])

const formattedCode = computed(() => {
  return generateFormatterCode('formatTemperature', number.value, {
    inputUnit: inputUnit.value,
    outputUnit: outputUnit.value,
    decimals: decimals.value,
    display: display.value,
    locale: locale.value,
  }, {
    inputUnit: 'celsius',
    outputUnit: 'auto',
    display: 'short',
  })
})
</script>
