<script setup>
const isOpen = ref(false);
</script>

<template>
  <div>
    <UButton
      color="white"
      variant="solid"
      size="lg"
      label="Download Data"
      class="border border-black"
      @click="isOpen = true"
    />

    <UModal v-model="isOpen">
      <div class="px-8 py-4">
        <h2 class="text-lg font-semibold">Download Data CSV</h2>
        <div class="flex flex-row items-center justify-between px-12 pt-8">
          <div>
            <label> Start Date</label>
            <UInput placeholder="Start Date" size="md" type="date" />
          </div>

          <div>
            <label> End Date</label>
            <UInput placeholder="End Date" size="md" type="date" />
          </div>
        </div>

        <div class="flex flex-row justify-end gap-4 pt-8">
          <UButton
            color="red"
            variant="outline"
            size="lg"
            label="Cancel"
            @click="isOpen = false"
          />

          <UButton
            variant="outline"
            size="lg"
            label="Download"
            @click="isOpen = false"
          />
        </div>
      </div>
    </UModal>
  </div>
</template>
