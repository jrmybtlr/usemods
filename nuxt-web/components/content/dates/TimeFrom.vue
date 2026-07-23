<template>
  <Example>
    <ExampleInputs class="flex flex-col gap-4">
      <div class="flex w-full gap-4 max-md:flex-col">
        <FormInput v-model="value" label="Date" type="datetime-local" />
        <FormInput v-model="now" label="Now (optional)" type="datetime-local" />
      </div>
      <div class="flex w-full gap-4 max-md:flex-col">
        <FormSelectLocale v-model="locale" />
        <FormSelect v-model="style" label="Style" info="Default: long · short → 10d">
          <option value="long">long</option>
          <option value="short">short</option>
          <option value="narrow">narrow</option>
        </FormSelect>
      </div>
      <div class="flex w-full gap-4 max-md:flex-col">
        <FormInput
          v-model.number="threshold"
          label="Threshold"
          info="Seconds · default 30"
          type="number"
          min="0"
        />
      </div>
    </ExampleInputs>
    <ExampleCode :code="formattedCode" />
    <ExampleResult>
      {{ timeFrom(value, buildOpts()) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
import { timeFrom } from 'usemods'

const value = ref('2025-06-15T12:00')
const now = ref('')
const locale = ref('')
const style = ref<'long' | 'short' | 'narrow'>('long')
const threshold = ref(30)

function buildOpts() {
  const opts: Record<string, unknown> = {
    locale: locale.value || undefined,
    now: now.value || undefined,
  }
  if (style.value !== 'long') {
    opts.style = style.value
  }
  if (threshold.value !== 30) {
    opts.threshold = threshold.value
  }
  return opts
}

const formattedCode = computed(() =>
  generateFormatterCode('timeFrom', value.value, buildOpts()),
)
</script>
