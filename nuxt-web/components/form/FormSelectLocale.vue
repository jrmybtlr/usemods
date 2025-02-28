<template>
  <FormSelect
    v-model="selectedLocale"
    label="Locale"
    info="Default: 'en-US'">

    <option
      value=""
      disabled>
      Select a locale
    </option>
    <option
      v-for="locale in configLocales"
      :key="locale"
      :value="locale">
      {{ locale }}
    </option>
  </FormSelect>
</template>

<script setup lang="ts">
const selectedLocale = ref(undefined)
const emit = defineEmits(['update:modelValue'])

watch(selectedLocale, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>
