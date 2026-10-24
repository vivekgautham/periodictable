import { readFileSync } from "node:fs";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const pkg = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf-8"),
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@mui") || id.includes("@emotion")) {
              return "mui";
            }
            if (id.includes("@tanstack")) {
              return "query";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
