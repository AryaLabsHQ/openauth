import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    root: "./",
    environment: "node",
    globals: true,
    reporters: ["verbose"],
    coverage: {
      reporter: ["text", "lcov"],
      provider: "v8",
      include: ["tests/**/*.test.ts"],
    },
  },
});
