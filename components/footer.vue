<!-- components\footer.vue -->
<template>
  <footer class="mt-8 min-w-full py-5 text-center bg-[var(--p-surface-700)]">
    <p>
      Check out the project on
      <Button
        as="a"
        label="GitHub"
        href="https://github.com/Ange230700/ultime_motus"
        target="_blank"
        rel="noopener"
        variant="link"
        style="font-size: 1.5rem"
      />
    </p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FooterComponent",
});
</script>

<style scoped>
/* Tailwind global styles apply; no additional rules needed here. */
</style>
