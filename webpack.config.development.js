/**
 * Webpack configuration overrides for the `development` environment.
 *  This configuration will be used if an environment has has been defined
 *    within the dotenv environment file.
 */
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  devServer: {
    stats: "errors-only",
    open: true,
    contentBase: process.env.DIST,
    port: process.env.PORT,
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
