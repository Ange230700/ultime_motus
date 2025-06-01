// nuxt.config.ts

import { fileURLToPath } from "node:url";
import { defineNuxtConfig } from "nuxt/config";
import Aura from "@primeuix/themes/aura";
import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@primevue/nuxt-module",
  ],

  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },

  css: ["@@/public/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        // "@"  → ./src
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        // "@@" → ./
        "@@": fileURLToPath(new URL(".", import.meta.url)),
      },
    },
  },
});
