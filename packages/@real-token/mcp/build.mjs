import * as esbuild from "esbuild";
import { readFile } from "fs/promises";

const pkg = JSON.parse(
  await readFile(new URL("./package.json", import.meta.url), "utf-8")
);

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

await esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  outfile: "dist/index.js",
  format: "esm",
  target: ["node18"],
  platform: "node",
  external,
  sourcemap: true,
  minify: false,
  metafile: true,
  logLevel: "info",
});
