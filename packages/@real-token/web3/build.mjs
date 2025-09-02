import * as esbuild from "esbuild";
import cssModulesPlugin from "esbuild-css-modules-plugin";
import { readFile } from "fs/promises";

const pkg = JSON.parse(
  await readFile(new URL("./package.json", import.meta.url), "utf-8")
);

// Get all external dependencies
const external = [
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.dependencies || {}),
];

await esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  outfile: "dist/index.js",
  format: "esm",
  target: ["es2020"],
  platform: "browser",
  external: external.filter(
    (dep) => !dep.includes("@rabby-wallet/rabby-action")
  ),
  plugins: [
    cssModulesPlugin({
      inject: true,
      localsConvention: "camelCaseOnly",
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    }),
  ],
  loader: {
    ".css": "css",
    ".svg": "dataurl",
  },
  sourcemap: true,
  minify: false,
  metafile: true,
  logLevel: "info",
});
