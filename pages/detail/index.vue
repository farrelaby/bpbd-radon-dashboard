<script setup lang="ts">
definePageMeta({
  colorMode: "light",
  middleware: ["auth"],
});

const route = useRoute();
// console.log(route.query);
const { variable, start, end } = route.query;

let seriesName: string;
if (variable === "radon") {
  seriesName = "Radon Concentration";
} else if (variable === "gwl") {
  seriesName = "Ground Water Level";
}

const downloadHandler = async () => {
  await navigateTo(
    {
      path: `/api/v1/download/${variable}`,
      query: {
        start: start as string,
        end: end as string,
      },
    },
    {
      open: {
        target: "_blank",
      },
    },
  );
};
</script>

<template>
  <div class="h-full">
    <NavBar />

    <div class="-mt-3 h-full">
      <!-- <div class="bg-cover bg-center py-6 lg:bg-[url(jpg02-klaten.jpg)]">
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
      </div> -->

      <div
        class="flex h-full flex-col justify-center gap-4 px-20 pt-10 lg:flex-row"
      >
        <div
          class="h-[65vh] w-full rounded border border-black px-4 py-2 shadow"
        >
          <div class="flex h-1/6 flex-row justify-between">
            <p class="text-2xl font-semibold">{{ seriesName }}</p>
          </div>
          <div class="h-4/6">
            <DetailChart
              :variable="variable as string"
              :start="start as string"
              :end="end as string"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-center pt-8">
        <UButton
          icon="i-heroicons-arrow-down-circle"
          color="green"
          variant="solid"
          size="xl"
          label="Download Data"
          @click="downloadHandler"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
