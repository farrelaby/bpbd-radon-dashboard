// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    "@nuxtjs/eslint-module",
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
  ],
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

  routeRules: {
    "/**": { prerender: true },
  },
  app: {
    head: {
      title: "Radon Concentration and Groundwater Level Dashboard",
      link: [{ rel: "icon", type: "image/x-icon", href: "/bpbd-logo.png" }],
    },
  },
});
