import * as esbuild from "esbuild";
import cssModulesPlugin from "esbuild-css-modules-plugin";
import { readFile } from "fs/promises";
import postCssPlugin from "@deanc/esbuild-plugin-postcss";
import postcssPresetMantine from "postcss-preset-mantine";
import postcssSimpleVars from "postcss-simple-vars";

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
  target: ["ES2021"],
  platform: "browser",
  external,
  plugins: [
    cssModulesPlugin({
      inject: true,
      localsConvention: "camelCaseOnly",
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    }),
    postCssPlugin({
      plugins: [
        postcssPresetMantine(),
        postcssSimpleVars({
          variables: {
            "mantine-breakpoint-xs": "36em",
            "mantine-breakpoint-sm": "48em",
            "mantine-breakpoint-md": "62em",
            "mantine-breakpoint-lg": "75em",
            "mantine-breakpoint-xl": "88em",
          },
        }),
      ],
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
