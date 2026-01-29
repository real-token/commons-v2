import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      globals: {
          Buffer: true,
          global: true,
          process: false, // On gère process dans index.html
      },
      include: ['buffer', 'stream', 'util', 'events'],
      protocolImports: true,
    }),
  ],
  define: {
    "process.env.NODE_ENV": `"${process.env.NODE_ENV}"`,
  },
});
