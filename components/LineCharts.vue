<script setup lang="ts">
const newData = [
  {
    x: 1991,
    y: 30,
  },
  {
    x: 1992,
    y: 40,
  },
  {
    x: 1993,
    y: 10,
  },
  {
    x: 1994,
    y: 50,
  },
  {
    x: 1995,
    y: 49,
  },
  {
    x: 1996,
    y: 60,
  },
  {
    x: 1997,
    y: 70,
  },
  {
    x: 1998,
    y: 91,
  },
];

const chartOptions: ApexCharts.ApexOptions = {
  chart: {
    id: "vuechart-example",
  },
  xaxis: {
    // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
};
const series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined = [
  {
    name: "series-1",
    data: newData,
  },
];
</script>

<template>
  <ClientOnly>
    <apexcharts
      width="100%"
      height="100%"
      type="line"
      :options="chartOptions"
      :series="series"
    ></apexcharts>
  </ClientOnly>
</template>
