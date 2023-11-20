<script setup>
const isOpen = ref(false);

const startDate = ref(new Date().toISOString().slice(0, 10));
const endDate = ref(new Date().toISOString().slice(0, 10));

const downloadHandler = async () => {
  const url = computed(
    () => `/api/v1/download?start=${startDate.value}&end=${endDate.value}`,
  );
  await navigateTo(url.value, {
    open: {
      target: "_blank",
    },
  });
};
</script>

<template>
  <div>
    <UButton
      icon="i-heroicons-arrow-down-circle"
      color="green"
      variant="solid"
      size="xl"
      label="Download Data"
      @click="isOpen = true"
    />

    <UModal v-model="isOpen">
      <div class="border border-black bg-white px-8 py-4">
        <h2 class="text-lg font-semibold text-black">Download Data CSV</h2>
        <div
          class="flex flex-row items-center justify-between gap-4 px-12 pt-8 text-black"
        >
          <div>
            <label> Start Date</label>
            <!-- <UInput placeholder="Start Date" size="md" type="date" /> -->
            <VueDatePicker
              v-model="startDate"
              input-class-name="dp-custom-input"
              :max-date="new Date()"
              format="dd/MM/yyyy"
              auto-apply
              dark
              :teleport="true"
            ></VueDatePicker>
          </div>

          <div>
            <label> End Date</label>
            <!-- <UInput placeholder="End Date" size="md" type="date" /> -->
            <VueDatePicker
              v-model="endDate"
              input-class-name="dp-custom-input"
              :max-date="new Date()"
              format="dd/MM/yyyy"
              auto-apply
              dark
              :teleport="true"
            ></VueDatePicker>
          </div>
        </div>

        <div class="flex flex-row justify-end gap-4 pt-8">
          <UButton
            color="red"
            variant="solid"
            size="lg"
            label="Cancel"
            @click="isOpen = false"
          />

          <UButton
            variant="solid"
            size="lg"
            label="Download"
            @click="downloadHandler"
          />
        </div>
      </div>
    </UModal>
  </div>
</template>
