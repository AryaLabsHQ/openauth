import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    workspace: ["packages/*"],
    environment: "node",
    coverage: { provider: "v8" },
    reporters: ["verbose"],
  },
});
