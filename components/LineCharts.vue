<script setup lang="ts">
const props = defineProps({
  startDate: {
    required: true,
    type: String,
  },
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
  unit = "m";
  yLegend = `${seriesName} (${unit})`;
}

const url = computed(
  () => `/api/v1/data?start=${props.startDate}&variable=${props.variable}`,
);

const { data: fetchData } = await useFetch<FetchType>(url, {
  method: "GET",
});

const apexOptions: ApexCharts.ApexOptions = {
  chart: {
    id: "vuechart-example",
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
