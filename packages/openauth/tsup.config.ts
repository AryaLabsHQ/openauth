import { defineConfig } from "tsup";
import pkg from "./package.json" assert { type: "json" };

const externals = [...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.peerDependencies ?? {})];

export default defineConfig([
  {
    entry: ["src/**/*.ts", "src/**/*.tsx", "!src/css.d.ts", "!src/ui/base.tsx"],
    bundle: false,
    format: ["esm"],
    outDir: "dist",
    clean: true,
    loader: { ".css": "text" },
    sourcemap: true,
    dts: true,
  },

  {
    entry: ["src/ui/base.tsx"],
    bundle: true,
    splitting: false,
    format: ["esm"],
    outDir: "dist/ui",
    external: externals,
    loader: { ".css": "text" },
    sourcemap: true,
  },
]);
