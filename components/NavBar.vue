<template>
  <nav
    class="navbar relative rounded-b-xl bg-black px-8 py-2 text-white shadow-lg"
  >
    <NuxtLink to="/" class="navbar-start gap-2">
      <img width="65" height="65" src="/klaten-logo.png" />

      <img width="80" height="80" src="/bpbd-logo.png" />
      <p className="ml-2 pr-8 text-xl font-semibold">
        Radon & Ground Water Level Monitoring
      </p>
    </NuxtLink>
    <div class="navbar-center hidden lg:flex"></div>
    <!-- <div class="navbar-end gap-8">
      <ULink
        to="/login"
        active-class="text-primary"
        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
      >
        Login
      </ULink>
    </div> -->

    <!-- <div class="navbar-end gap-8">
      <ULink
        to="/"
        active-class="text-blue-500"
        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
      >
        Dashboard
      </ULink>
      <ULink
        to="/download"
        active-class="text-primary"
        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
      >
        Download
      </ULink>
    </div> -->
  </nav>
</template>

<script></script>

<style lang="scss" scoped></style>
