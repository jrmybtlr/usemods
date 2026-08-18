<template>
  <Example>
    <ExampleInputs class="flex flex-col gap-2">
      <div class="flex w-full gap-2">
        <FormInput
          v-model="from"
          label="From"
          type="datetime-local" />
        <FormInput
          v-model="to"
          label="To"
          type="datetime-local" />
      </div>
      <div class="flex w-full gap-2">
        <FormSelectLocale v-model="locale" />
        <FormSelect
          v-model="display"
          info="Default: 'long'"
          label="Display">
          <option
            value=""
            disabled
            selected>
            Select Display
          </option>
          <option value="short">
            Short
          </option>
          <option value="long">
            Long
          </option>
        </FormSelect>
        <FormSelect
          v-model="showTime"
          info="Multi-day ranges"
          label="Show Time">
          <option value="false">
            Off
          </option>
          <option value="true">
            On
          </option>
        </FormSelect>
      </div>
    </ExampleInputs>
    <ExampleCode :code="formattedCode" />
    <ExampleResult>
      {{
        combineDates(from, to, {
          locale: locale ? locale : undefined,
          display: display,
          showTime: showTime === 'true',
        })
      }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
import { combineDates } from 'usemods'

const from = ref('2025-01-01T10:00:00')
const to = ref('2025-01-31T14:30:00')
const locale = ref(undefined)
const display = ref(undefined)
const showTime = ref('false')

// Demo Purposes Only
const formattedCode = computed(() => {
  return generateFormatterCode('combineDates', [from.value, to.value], {
    locale: locale.value,
    display: display.value,
    showTime: showTime.value === 'true' ? true : undefined,
  }, {
    display: 'long',
  })
})
</script>
