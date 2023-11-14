<script setup lang="ts">
definePageMeta({
  colorMode: "light",
  middleware: ["auth"],
});

const radonDate = ref(new Date().toISOString().slice(0, 10));
const gwlDate = ref(new Date().toISOString().slice(0, 10));
</script>

<template>
  <div>
    <NavBar />

    <div class="-mt-3">
      <div class="bg-cover bg-center py-6 lg:bg-[url(jpg02-klaten.jpg)]">
        <div
          class="hidden h-full w-full px-10 pb-4 text-white backdrop-blur backdrop-contrast-50 lg:block"
        >
          <h1 class="text-center text-4xl font-bold">
            Radon Concentration & Ground Water Level Monitoring
          </h1>
          <h2 class="text-center text-2xl font-semibold">
            BPBD Kabupaten Klaten
          </h2>
        </div>
      </div>
      <div class="flex flex-col justify-center gap-4 px-20 pt-10 lg:flex-row">
        <div class="h-96 w-full rounded border border-black px-4 py-2 shadow">
          <div class="flex h-1/6 flex-row justify-between">
            <p class="text-2xl font-semibold">Radon Concentration</p>
            <div class="flex flex-row justify-end">
              <label class="w-2/3 text-lg">Pick Date : </label>
              <VueDatePicker
                v-model="radonDate"
                input-class-name="dp-custom-input"
                :max-date="new Date()"
                format="dd/MM/yyyy"
                auto-apply
                dark
              ></VueDatePicker>
            </div>
          </div>
          <div class="h-5/6">
            <LineCharts :start-date="radonDate" variable="radon" />
          </div>
        </div>

        <!-- <UDivider color="gray" orientation="vertical" class="w-fit" /> -->

        <div class="h-96 w-full rounded border border-black px-4 py-2 shadow">
          <div class="flex h-1/6 flex-row justify-between">
            <p class="text-2xl font-semibold">Ground Water Level</p>
            <div class="flex flex-row justify-end">
              <label class="w-2/3 text-lg">Pick Date : </label>
              <VueDatePicker
                v-model="gwlDate"
                input-class-name="dp-custom-input"
                :max-date="new Date()"
                format="dd/MM/yyyy"
                auto-apply
                dark
              ></VueDatePicker>
            </div>
          </div>
          <div class="h-5/6">
            <LineCharts :start-date="gwlDate" variable="gwl" />
          </div>
        </div>
      </div>
      <div class="flex justify-center pt-8">
        <DownloadModal />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dp-custom-input {
  box-shadow: 0 0 6px #1976d2;
  color: #1976d2;
}
</style>
