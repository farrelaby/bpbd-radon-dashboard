<script setup lang="ts">
const props = defineProps({
  variable: {
    required: true,
    type: String,
  },
});

type FetchType = {
  x: Date;
  y: number | null;
}[];

let seriesName;
let unit: string;
let yLegend: string | undefined;

if (props.variable === "radon") {
  seriesName = "Radon Concentration";
  unit = "Bq/m3";
  yLegend = `${seriesName} (${unit})`;
} else if (props.variable === "gwl") {
  seriesName = "Ground Water Level";
  unit = "cm";
  yLegend = `${seriesName} (${unit})`;
}

const url = computed(() => `/api/v1/data?variable=${props.variable}`);

const { data: fetchData, refresh } = await useFetch<FetchType>(url, {
  method: "GET",
  server: false,
});

useIntervalFn(() => {
  /* your function */
  refresh();
}, 30 * 1000);

const apexOptions: ApexCharts.ApexOptions = {
  chart: {
    id: "line-chart",
    toolbar: {
      tools: {
        download: false,
      },
    },
  },
  xaxis: {
    type: "datetime",
    title: {
      text: "Jam",
    },
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
    data: fetchData,
  },
]);
</script>

<template>
  <ClientOnly>
    <!-- <p v-if="pending">Loading...</p> -->
    <apexcharts
      width="100%"
      height="100%"
      type="line"
      :options="chartOptions"
      :series="series"
    ></apexcharts>
  </ClientOnly>
</template>
