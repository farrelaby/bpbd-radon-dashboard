<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

definePageMeta({
  colorMode: "light",
});

const toast = useToast();

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
    onResponseError: (err) => {
      if (err.response.status === 401) {
        toast.add({
          title: "Login Failed",
          description: "Email or Password is incorrect",
          color: "red",
          icon: "i-heroicons-exclamation-circle-20-solid",
        });
      } else {
        toast.add({
          title: "Login Failed",
          description: "Something went wrong",
          color: "red",
          icon: "i-heroicons-exclamation-circle-20-solid",
        });
      }
    },
  });
}

const isPasswordVisible = ref(false);
</script>

<template>
  <main
    class="min-h-screen bg-[url(Candi_Plaosan_Lor.webp)] bg-cover bg-no-repeat pt-56"
  >
    <div class="flex w-full flex-row justify-center px-72 pt-6">
      <div class="w-1/3 rounded bg-opacity-80 backdrop-blur-lg">
        <!-- <img src="/jpg02-klaten.jpg" alt="bg" class="h-full w-full" /> -->
        <div class="flex flex-col items-center gap-6 py-8">
          <img width="105" height="105" src="/klaten-logo.png" />

          <img width="120" height="120" src="/bpbd-logo.png" />
        </div>
      </div>

      <div
        class="flex w-1/3 flex-col items-center gap-8 rounded bg-white bg-opacity-80 py-8 shadow backdrop-blur-2xl"
      >
        <h1 class="text-xl font-bold">Login</h1>

        <UForm :validate="validate" :state="state" @submit="onSubmit">
          <UFormGroup label="Email" name="email" class="h-24">
            <UInput v-model="state.email" />
          </UFormGroup>

          <UFormGroup label="Password" name="password" class="h-24">
            <UInput
              v-model="state.password"
              :type="isPasswordVisible ? 'text' : 'password'"
              :ui="{ icon: { trailing: { pointer: '' } } }"
            >
              <template #trailing>
                <UButton
                  color="gray"
                  variant="link"
                  :icon="
                    isPasswordVisible
                      ? 'i-heroicons-eye'
                      : 'i-heroicons-eye-slash'
                  "
                  :padded="false"
                  @click="isPasswordVisible = !isPasswordVisible"
                />
              </template>
            </UInput>
          </UFormGroup>

          <UButton type="submit" class="mt-4" size="xl"> Login </UButton>
        </UForm>
      </div>
    </div>
  </main>
</template>
