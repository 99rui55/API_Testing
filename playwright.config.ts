import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    baseURL: "https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7",
  },

  testDir: "./tests",
});
