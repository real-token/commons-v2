const path = require("path");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

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
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              import: true,
              modules: {
                namedExport: false,
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]],
              },
            },
          },
        ],
        include: /\.module\.css$/,
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
    plugins: [
      new TsconfigPathsPlugin({
        /* options: see below */
      }),
    ],
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
    new MiniCssExtractPlugin(),
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
  target: "node20",
});

module.exports = [cjsConfig, esmConfig];
