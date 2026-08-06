<template>
  <Example>
    <ExampleInputs>
      <FormInput
        v-model="seconds"
        label="Seconds"
        type="number" />
      <FormSelect
        v-model="labels"
        label="Format"
        info="Default: 'short'">
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
        label="Rounding"
        info="Default: false"
        @update:model-value="val => round = val === 'true'">
        <option value="false">
          False
        </option>
        <option value="true">
          True
        </option>
      </FormSelect>
    </ExampleInputs>
    <ExampleCode :code="`formatDurationLabels(${seconds}, { labels: '${labels}', round: ${round} })`" />
    <ExampleResult>
      {{ formatDurationLabels(seconds, { labels, round }) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const seconds = ref(954321)
const labels = ref<'long' | 'short'>('short')
const round = ref(false)
</script>
