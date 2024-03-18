const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new webpack.DefinePlugin({
      __IS_PRODUCTION__: JSON.stringify(false),
    }),
  ],
  devServer: {
    static: "./dist",
    hot: true,
    port: 3000,
  },
});
