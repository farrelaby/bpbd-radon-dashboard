<script setup lang="ts">
import dayjs from "dayjs";

definePageMeta({
  colorMode: "light",
  middleware: ["auth"],
});

const radonDate = ref([dayjs(new Date()).subtract(2, "day"), new Date()]);

const gwlDate = ref([dayjs(new Date()).subtract(2, "day"), new Date()]);

// const startRadonDate = computed(() => radonDate.value[0]);

const handleRadonRoute = async () => {
  await navigateTo({
    path: "/detail",
    query: {
      variable: "radon",
      start: dayjs(radonDate.value[0]).format("YYYY-MM-DD"),
      end: dayjs(radonDate.value[1]).format("YYYY-MM-DD"),
    },
  });
};

const handleGwlRoute = async () => {
  await navigateTo({
    path: "/detail",
    query: {
      variable: "gwl",
      start: dayjs(gwlDate.value[0]).format("YYYY-MM-DD"),
      end: dayjs(gwlDate.value[1]).format("YYYY-MM-DD"),
    },
  });
};
</script>

<template>
  <div class="h-full">
    <NavBar />

    <div class="-mt-3 h-full">
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
      <div
        class="flex h-full flex-col justify-center gap-4 px-20 pt-10 lg:flex-row"
      >
        <div
          class="h-[50vh] w-full rounded border border-black px-4 py-2 shadow"
        >
          <div class="flex h-1/6 flex-row justify-between">
            <p class="text-2xl font-semibold">Radon Concentration</p>
          </div>
          <div class="h-4/6">
            <HomeLineCharts variable="radon" />
          </div>
          <div class="flex h-1/6 w-full flex-row items-center gap-4">
            <label class="w-1/2 text-lg">Pick a Date : </label>
            <VueDatePicker
              v-model="radonDate"
              input-class-name="dp-custom-input"
              :max-date="new Date()"
              format="dd/MM/yyyy"
              auto-apply
              dark
              :clearable="false"
              range
            ></VueDatePicker>
            <!-- <p class="text-xl">-</p>
            <VueDatePicker
              v-model="endRadonDate"
              input-class-name="dp-custom-input"
              :max-date="new Date()"
              format="dd/MM/yyyy"
              auto-apply
              dark
              :clearable="false"
            ></VueDatePicker> -->
            <UButton
              icon="i-heroicons-magnifying-glass-20-solid"
              size="sm"
              color="primary"
              square
              variant="solid"
              @click="handleRadonRoute"
            />
          </div>
        </div>

        <!-- <UDivider color="gray" orientation="vertical" class="w-fit" /> -->

        <div
          class="h-[50vh] w-full rounded border border-black px-4 py-2 shadow"
        >
          <div class="flex h-1/6 flex-row justify-between">
            <p class="text-2xl font-semibold">Ground Water Level</p>
          </div>
          <div class="h-4/6">
            <HomeLineCharts variable="gwl" />
          </div>
          <div class="flex h-1/6 w-full flex-row items-center gap-4">
            <label class="w-1/2 text-lg">Pick a Date : </label>
            <VueDatePicker
              v-model="gwlDate"
              input-class-name="dp-custom-input"
              :max-date="new Date()"
              format="dd/MM/yyyy"
              auto-apply
              dark
              :clearable="false"
              range
            ></VueDatePicker>
            <!-- <p class="text-xl">-</p>
            <VueDatePicker
              v-model="radonDate"
              input-class-name="dp-custom-input"
              :max-date="new Date()"
              format="dd/MM/yyyy"
              auto-apply
              dark
              :clearable="false"
            ></VueDatePicker> -->
            <UButton
              icon="i-heroicons-magnifying-glass-20-solid"
              size="sm"
              color="primary"
              square
              variant="solid"
              @click="handleGwlRoute"
            />
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
