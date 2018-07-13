/**
 * Global configuration file for all defined environments.
 */

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const StyleLintFormatterPretty = require("stylelint-formatter-pretty");

const sources = require("./build/config/sources").webpakSources();

module.exports = {
  mode: "none",
  entry: sources || {},
  stats: { children: false },
  output: {
    path: path.resolve(__dirname, process.env.DIST),
    filename: "[name].js"
  },
  plugins: [
    /**
     * Webpack will parse our initial stylesheet from the base entry file: base/index.js
     */
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new StyleLintPlugin({
      configFile: `${process.cwd()}/.stylelintrc`,
      formatter: StyleLintFormatterPretty,
      context: process.env.SRC,
      quiet: false,
      files: "**/*.css",
      failOnError: false,
      emitErrors: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              sourceMap: true
            }
          },
          "css-loader",
          "postcss-loader"
        ]
      }
    ]
  }
};
