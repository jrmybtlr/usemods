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
      v-for="locale in localeOptions"
      :key="locale"
      :value="locale">
      {{ locale }}
    </option>
  </FormSelect>
</template>

<script setup lang="ts">
import { configLocales } from 'usemods'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | undefined]
}>()

const localeOptions = [...configLocales]

const selectedLocale = computed({
  get: () => props.modelValue ?? '',
  set: (value: string) => emit('update:modelValue', value || undefined),
})
</script>
