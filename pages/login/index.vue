<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

definePageMeta({
  colorMode: "light",
});

const state = reactive({
  email: undefined,
  password: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: "email", message: "Required" });
  if (!state.password) errors.push({ path: "password", message: "Required" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  await $fetch("/api/v1/auth/login", {
    method: "POST",
    body: event.data,
    onResponse: (res) => {
      if (res.response.ok) {
        navigateTo("/");
      }
    },
  });
}
</script>

<template>
  <main class="min-h-screen pt-56">
    <UForm
      :validate="validate"
      :state="state"
      class="mx-auto flex w-fit flex-col items-center gap-6 border px-10 py-8 shadow"
      @submit="onSubmit"
    >
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <UButton type="submit"> Submit </UButton>
    </UForm>
  </main>
</template>
