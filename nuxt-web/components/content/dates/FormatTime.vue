<template>
  <Example>
    <ExampleInputs class="flex flex-col gap-2">
      <FormInput v-model="value" label="Date" type="datetime-local" />
      <div class="flex gap-2 w-full flex-wrap">
        <FormSelect v-model="timeStyle" label="Time style">
          <option value="short">short</option>
          <option value="medium">medium</option>
          <option value="long">long</option>
          <option value="full">full</option>
        </FormSelect>
        <FormSelectLocale v-model="locale" />
      </div>
    </ExampleInputs>
    <ExampleCode :code="formattedCode" />
    <ExampleResult>
      {{ formatTime(value, buildOpts()) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const value = ref('2025-06-15T12:00')
const locale = ref('')
const timeStyle = ref<'short' | 'medium' | 'long' | 'full'>('short')

function buildOpts() {
  return {
    locale: locale.value || undefined,
    timeStyle: timeStyle.value,
  }
}

const formattedCode = computed(() =>
  generateFormatterCode('formatTime', value.value, buildOpts()),
)
</script>
