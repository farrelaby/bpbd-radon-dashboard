<script setup lang="ts">
const props = defineProps({
  variable: {
    required: true,
    type: String,
  },
  start: {
    required: true,
    type: String,
  },
  end: {
    required: true,
    type: String,
  },
});

let seriesName;
let unit: string;
let yLegend: string | undefined;

if (props.variable === "radon") {
  seriesName = "Radon Concentration";
  unit = "Bq/m3";
  yLegend = `${seriesName} (${unit})`;
} else if (props.variable === "gwl") {
  seriesName = "Ground Water Level";
  unit = "m";
  yLegend = `${seriesName} (${unit})`;
}

// const url = computed(() => `/api/v1/data?variable=${props.variable}`);

const { data, refresh, pending } = await useFetch("/api/v1/data/range", {
  method: "GET",
  server: false,
  query: {
    variable: props.variable,
    start: props.start,
    end: props.end,
  },
});

useIntervalFn(() => {
  /* your function */
  refresh();
}, 30 * 1000);

const apexOptions: ApexCharts.ApexOptions = {
  chart: {
    id: "detail-line-chart",
    toolbar: {
      tools: {
        download: false,
      },
    },
  },
  xaxis: {
    type: "datetime",
    // title: {
    //   text: "Jam",
    // },
  },
  yaxis: {
    title: {
      text: yLegend,
    },
  },
  tooltip: {
    y: {
      formatter: (val) => {
        return val.toFixed(2) + " " + unit;
      },
    },
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
};

const chartOptions = ref(apexOptions);

const series = ref([
  {
    name: seriesName,
    data,
  },
]);
</script>

<template>
  <ClientOnly>
    <!-- <p v-if="pending">Loading...</p> -->
    <div v-if="pending" class="w-full animate-pulse bg-gray-400"></div>
    <apexcharts
      width="100%"
      height="120%"
      type="line"
      :options="chartOptions"
      :series="series"
    ></apexcharts>
  </ClientOnly>
</template>
