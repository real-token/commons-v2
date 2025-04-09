process.env.NODE_ENV = process.env.NODE_ENV || "production";

const path = require("path");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const TypescriptDeclarationPlugin = require("typescript-declaration-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const pkg = require("./package.json");

const currentPkg = require("./package.json");
const runtimeVersion = currentPkg.peerDependencies["@babel/runtime"];
const babelLoaderOptions = {
  presets: [
    ["@babel/env", { modules: false, bugfixes: true }],
    "@babel/typescript",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  plugins: [["@babel/transform-runtime", { version: runtimeVersion }]],
  babelrc: false,
  configFile: false,
  cacheDirectory: true,
  cacheCompression: false,
};
const babelLoader = {
  test: /\.(ts|js)x?$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: "babel-loader",
    options: babelLoaderOptions,
  },
};

// CJS-specific configuration
const allDeps = [...Object.keys(pkg.peerDependencies || {})];

// Common configuration
const commonConfig = {
  mode: "production",
  entry: "./src/index.ts",
  module: {
    rules: [
      babelLoader,
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
    ],
  },
  externals: [...allDeps, /^(@babel\/runtime)/i],
  optimization: {
    minimize: false,
  },
  devtool: false,
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    fallback: {
      fs: false,
      path: false,
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser.js",
      Buffer: ["buffer", "Buffer"],
    }),
    new NodePolyfillPlugin(),
  ],
};

const cjsConfig = merge(commonConfig, {
  output: {
    filename: "index.cjs.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    library: {
      type: "commonjs2",
    },
    globalObject: "this",
  },
  target: "web",
  externalsPresets: { node: true },
  externals: [...allDeps, /^(@babel\/runtime)/i, nodeExternals()],
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        mode: "write-dts",
        context: path.resolve("."),
        configFile: "tsconfig.json",
      },
    }),
    new TypescriptDeclarationPlugin(),
  ],
});

// ESM-specific configuration
const esmConfig = merge(commonConfig, {
  output: {
    filename: "index.esm.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    library: {
      type: "module",
    },
    chunkFormat: "module",
    module: true,
    globalObject: "this",
  },
  externals: [
    ...allDeps,
    /^(@babel\/runtime)/i,
    nodeExternals({
      importType: "module",
    }),
  ],
  externalsPresets: { node: true },
  experiments: {
    outputModule: true,
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            ...babelLoaderOptions,
            presets: [
              [
                "@babel/env",
                {
                  modules: false,
                  bugfixes: true,
                  targets: { esmodules: true },
                },
              ],
              "@babel/typescript",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "production"
      ),
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
});

module.exports = [cjsConfig, esmConfig];
