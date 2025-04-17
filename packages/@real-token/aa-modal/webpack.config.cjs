process.env.NODE_ENV = process.env.NODE_ENV || "production";

const path = require("path");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const TypescriptDeclarationPlugin = require("typescript-declaration-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
const allDeps = [
  ...Object.keys(pkg.peerDependencies || {}).map(
    (dep) => new RegExp(`^${dep}(/.*)?$`)
  ),
  ...Object.keys(pkg.dependencies || {}).map(
    (dep) => new RegExp(`^${dep}(/.*)?$`)
  ),
];

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
  // includes: [
  //   'i18next',
  //   'i18next-browser-languagedetector',
  //   'react-i18next'
  // ],
  optimization: {
    minimize: false,
  },
  devtool: false,
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    fallback: {
      //   url: require.resolve("url"),
      //   crypto: require.resolve("crypto-browserify"),
      //   http: require.resolve("stream-http"),
      //   https: require.resolve("https-browserify"),
      //   zlib: require.resolve("browserify-zlib"),
      //   stream: require.resolve("stream-browserify"),
      //   vm: require.resolve("vm-browserify"),
      //   process: require.resolve("process/browser"),
      //   buffer: require.resolve("buffer"),
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
