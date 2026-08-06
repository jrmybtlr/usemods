<template>
  <Example>
    <ExampleInputs>
      <form
        ref="form"
        class="flex w-full items-end gap-3"
        class:max-md="flex-col">
        <FormInput
          label="Name"
          type="text"
          name="name"
          value=""
          placeholder="Name" />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value=""
          placeholder="Email" />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value=""
          placeholder="Password" />
        <FormSelect
          v-model="index"
          label="Select"
          name="select"
          placeholder="Select an option">
          <option value="0">
            First (0)
          </option>
          <option value="1">
            Second (1)
          </option>
          <option value="-1">
            Last (-1)
          </option>
        </FormSelect>
        <Button @click="form && focusOnNth(form, index)">
          Focus
        </Button>
      </form>
    </ExampleInputs>
  </Example>
</template>

<script setup lang="ts">
const form = ref<HTMLFormElement>()
const index = ref(0)
</script>
