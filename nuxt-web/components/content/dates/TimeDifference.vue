<template>
  <Example>
    <ExampleInputs class="flex flex-col gap-2">
      <div class="flex gap-2 w-full flex-wrap">
        <FormInput v-model="from" label="From" type="datetime-local" />
        <FormInput v-model="to" label="To" type="datetime-local" />
      </div>
      <div class="flex gap-2 w-full flex-wrap">
        <FormSelect v-model="unit" label="Unit">
          <option value="auto">auto</option>
          <option value="days">days</option>
          <option value="hours">hours</option>
          <option value="minutes">minutes</option>
          <option value="seconds">seconds</option>
        </FormSelect>
        <FormSelect v-model="style" label="Style (auto only)">
          <option value="short">short</option>
          <option value="long">long</option>
          <option value="narrow">narrow</option>
        </FormSelect>
        <FormInput
          v-model.number="maxUnits"
          class="max-w-[10rem]"
          label="Max units (auto)"
          type="number"
          min="1"
          max="6"
        />
        <FormSelectLocale v-model="locale" />
      </div>
    </ExampleInputs>
    <ExampleCode :code="formattedCode" />
    <ExampleResult>
      {{ timeDifference(from, to, buildOpts()) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
import { timeDifference } from 'usemods'

const from = ref('2025-01-01T00:00')
const to = ref('2025-01-11T00:00')
const locale = ref('')
const unit = ref<'auto' | 'days' | 'hours' | 'minutes' | 'seconds'>('auto')
const style = ref<'long' | 'short' | 'narrow'>('short')
const maxUnits = ref(6)

function buildOpts() {
  const opts: Record<string, unknown> = {
    locale: locale.value || undefined,
  }
  if (unit.value !== 'auto') {
    opts.unit = unit.value
  } else {
    opts.style = style.value
    opts.maxUnits = maxUnits.value
  }
  return opts
}

const formattedCode = computed(() =>
  generateFormatterCode('timeDifference', [from.value, to.value], buildOpts()),
)
</script>
