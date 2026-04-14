<template>
  <Example>
    <ExampleInputs class="flex flex-col gap-2">
      <FormInput v-model="value" label="Date" type="datetime-local" />
      <div class="flex gap-2 w-full flex-wrap">
        <FormSelect v-model="dateStyle" label="Date style">
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
      {{ formatDate(value, buildOpts()) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const value = ref('2025-06-15T12:00')
const locale = ref('')
const dateStyle = ref<'short' | 'medium' | 'long' | 'full'>('medium')

function buildOpts() {
  return {
    locale: locale.value || undefined,
    dateStyle: dateStyle.value,
  }
}

const formattedCode = computed(() =>
  generateFormatterCode('formatDate', value.value, buildOpts()),
)
</script>
