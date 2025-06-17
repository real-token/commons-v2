import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import inject from "@rollup/plugin-inject";
import nodePolyfills from "rollup-plugin-polyfill-node";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    NodeGlobalsPolyfillPlugin({
      buffer: true,
    }),
    NodeModulesPolyfillPlugin(),
    // nodePolyfills({
    //   globals: {
    //     Buffer: true,
    //   },
    // }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: "globalThis",
    "process.env.NODE_ENV": `"${process.env.NODE_ENV}"`,
  },
  build: {
    rollupOptions: {
      plugins: [inject({ Buffer: ["buffer/", "Buffer"] }), nodePolyfills()],
    },
  },
});
