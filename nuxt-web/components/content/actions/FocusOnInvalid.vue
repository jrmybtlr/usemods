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
          value="Timmy"
          placeholder="Name" />
        <FormInput
          label="Email*"
          type="email"
          name="email"
          value=""
          placeholder="Email"
          required />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value="passwordsarehard"
          placeholder="Password" />
        <Button @click="focusOnInvalid(form!)">
          Focus
        </Button>
      </form>
    </ExampleInputs>
  </Example>
</template>

<script setup lang="ts">
const form = ref<HTMLFormElement | null>(null)
</script>
