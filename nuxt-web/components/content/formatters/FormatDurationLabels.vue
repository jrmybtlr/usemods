<template>
  <Example>
    <ExampleInputs>
      <FormInput
        v-model="seconds"
        label="Seconds"
        type="number" />
      <FormSelect
        v-model="unitDisplay"
        label="Unit Display"
        info="Default: 'long'">
        <option
          value="short"
          selected>
          Short
        </option>
        <option value="long">
          Long
        </option>
      </FormSelect>
      <FormSelect
        :model-value="round"
        @update:model-value="val => round = val === 'true'"
        label="Rounding"
        info="Default: false">
        <option value="false">
          False
        </option>
        <option value="true">
          True
        </option>
      </FormSelect>
    </ExampleInputs>
    <ExampleCode :code="`formatDurationLabels(${seconds}, { unitDisplay: '${unitDisplay}', round: ${round} })`" />
    <ExampleResult>
      {{ formatDurationLabels(seconds, { unitDisplay, round }) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const seconds = ref(954321)
const unitDisplay = ref<'long' | 'short'>('short')
const round = ref(false)
</script>
