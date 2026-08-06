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
        <Button @click="action">
          Trap
        </Button>
      </form>
    </ExampleInputs>
  </Example>
</template>

<script setup lang="ts">
const form = ref<HTMLFormElement | null>(null)

function action() {
  focusTrap(form.value!)
  focusOnNth(form.value!, 0)
}
</script>
