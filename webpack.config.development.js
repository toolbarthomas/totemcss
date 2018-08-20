/**
 * Webpack configuration overrides for the `development` environment.
 *  This configuration will be used if an environment has has been defined
 *    within the dotenv environment file.
 */
const path = require("path");

module.exports = {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, process.env.DIST),
    compress: true,
    port: process.env.PORT,
    hot: true
  }
};
