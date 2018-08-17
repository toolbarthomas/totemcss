/**
 * Global configuration file for all defined environments.
 */

const path = require("path");
const _ = require("lodash");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * Defines each Webpack plugin defined from each task.
 */
const plugins = _.merge(require("./build/tasks/twig").plugins());

/**
 * Defines the Webpack rule for each specific task.
 */
const rules = _.merge(require("./build/tasks/twig").rules());

module.exports = {
  mode: "none",
  entry: require("./build/config/entries").webpackEntries() || {},
  stats: "minimal",
  output: {
    path: path.resolve(__dirname, process.env.DIST),
    filename: "[name].js"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      }
    ]
  }
};
