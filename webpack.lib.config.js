// webpack.lib.config.js
const path = require("path");
const pkg = require("./package.json");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "index.js", // CJS/UMD build
    library: "ReactPdfEditor", // global var name for UMD
    libraryTarget: "umd",
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  externals: [
    // anything you list as a peerDependency
    ...Object.keys(pkg.peerDependencies || {}),
    // if you had others:
    // { 'classnames': 'classnames' }
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "tsconfig.json"),
      }),
    ],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@styles": path.resolve(__dirname, "src/components/styles"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          configFile: path.resolve(__dirname, "tsconfig.json"),
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      { test: /\.(png|svg)$/, use: "url-loader?limit=10000" },
      { test: /\.(jpg|gif)$/, use: "file-loader" },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
      },
      {
        test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?name=[name].[ext]",
      },
    ],
  },
};
