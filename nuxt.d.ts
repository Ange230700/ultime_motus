// nuxt.d.ts
import type { PrimeVueModuleOptions } from "@primevue/nuxt-module";

// Tell TS that `primevue` is a valid top‐level key in nuxt.config.ts
declare module "@nuxt/schema" {
  interface NuxtConfig {
    primevue?: PrimeVueModuleOptions;
  }
}
