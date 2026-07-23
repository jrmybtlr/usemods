<template>
  <Example>
    <ExampleInputs class="flex flex-col gap-2">
      <div class="flex gap-2 w-full">
        <FormInput v-model="from" label="From" type="datetime-local" />
        <FormInput v-model="to" label="To" type="datetime-local" />
      </div>
      <div class="flex gap-2 w-full">
        <FormSelectLocale v-model="locale" />
        <FormSelect v-model="display" info="Default: 'long'" label="Display">
          <option value="" disabled selected>Select Display</option>
          <option value="short">Short</option>
          <option value="long">Long</option>
        </FormSelect>
      </div>
    </ExampleInputs>
    <ExampleCode :code="formattedCode" />
    <ExampleResult>
      {{
        formatCombinedDates(from, to, {
          locale: locale ? locale : undefined,
          display: display,
        })
      }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const from = ref("2025-01-01T10:00:00");
const to = ref("2025-01-01T14:30:00");
const locale = ref(undefined);
const display = ref(undefined);

// Demo Purposes Only
const formattedCode = computed(() => {
  return generateFormatterCode("formatCombinedDates", [from.value, to.value], {
    locale: locale.value,
    display: display.value,
  });
});
</script>
