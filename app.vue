<!-- app.vue -->

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <FooterComponent />
</template>

<script setup lang="ts">
import FooterComponent from "./components/footer.vue";
</script>
