<template>
  <Example>
    <ExampleInputs class="flex flex-col items-stretch gap-4">
      <div class="flex gap-4 max-md:flex-col">
        <FormInput
          v-model.number="number"
          label="Number"
          type="number"
          step="0.01" />
        <FormNumber
          v-model="decimals"
          label="Decimals"
          info="Default: 0"
          :min="0"
          :max="20" />
        <FormSelectLocale v-model="locale" />
      </div>
      <div class="flex items-stretch justify-stretch gap-4 max-md:flex-col">
        <FormSelect
          v-model="unit"
          label="Unit">
          <option
            v-for="unitOption in configUnits"
            :key="unitOption"
            :value="unitOption">
            {{ unitOption }}
          </option>
        </FormSelect>
        <FormSelect
          v-model="display"
          label="Display"
          info="Default: 'long'">
          <option value="long">
            Long
          </option>
          <option value="short">
            Short
          </option>
        </FormSelect>
      </div>
    </ExampleInputs>

    <ExampleCode :code="formattedCode" />
    <ExampleResult>
      {{ formatUnit(number, { unit, decimals: decimals || decimals === 0 ? decimals : undefined, display, locale: locale ? locale : undefined }) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const number = ref(0.12)
const decimals = ref(null)
const locale = ref('')
const unit = ref('acre')
const display = ref<'long' | 'short'>('long')

const formattedCode = computed(() => {
  return generateFormatterCode('formatUnit', number.value, {
    unit: unit.value,
    decimals: decimals.value,
    display: display.value,
    locale: locale.value,
  }, {
    unitDisplay: 'long',
  })
})
</script>
