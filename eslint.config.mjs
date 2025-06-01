// eslint.config.mjs

// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginVue from "eslint-plugin-vue";

export default withNuxt(
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  pluginVue.configs["flat/essential"],
);
