// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: ["@nuxtjs/eslint-module", "@nuxt/ui", "@nuxtjs/tailwindcss"],
  eslint: {
    cache: true,
    formatter: "stylish",
    lintOnStart: false,
  },
  tailwindcss: {},
  plugins: [
    { src: "~/plugins/apexcharts.client.ts", mode: "client" },
    {
      src: "~/plugins/vuedatepicker.ts",
    },
  ],
  colorMode: {
    preference: "light",
  },
});
