<template>
  <Example>
    <ExampleInputs>
      <FormInput
        v-model="seconds"
        label="Seconds"
        type="number" />
      <FormSelect
        v-model="display"
        label="Display"
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
    <ExampleCode :code="`formatDurationLabels(${seconds}, { display: '${display}', round: ${round} })`" />
    <ExampleResult>
      {{ formatDurationLabels(seconds, { display, round }) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const seconds = ref(954321)
const display = ref<'long' | 'short'>('short')
const round = ref(false)
</script>
