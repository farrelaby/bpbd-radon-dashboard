<script setup lang="ts"></script>

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
            <div class="flex flex-row justify-center gap-2">
              <label class="text-lg">Pick Date : </label>
              <UInput type="date" class="w-fit pb-2" size="sm" />
            </div>
          </div>
          <div class="h-5/6">
            <LineCharts />
          </div>
        </div>

        <UDivider color="gray" orientation="vertical" class="w-fit" />

        <div class="h-96 w-full rounded border border-black px-4 py-2 shadow">
          <div class="flex h-1/6 flex-row justify-between">
            <p class="text-2xl font-semibold">Ground Water Level</p>
            <div class="flex flex-row justify-center gap-2">
              <label class="text-lg">Pick Date : </label>
              <UInput type="date" class="w-fit pb-2" size="sm" />
            </div>
          </div>
          <div class="h-5/6">
            <LineCharts />
          </div>
        </div>
      </div>
      <div class="flex justify-center pt-8">
        <DownloadModal />
      </div>
    </div>
  </div>
</template>
