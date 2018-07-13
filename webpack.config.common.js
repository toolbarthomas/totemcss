/**
 * Global configuration file for all defined environments.
 */

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const StyleLintFormatterPretty = require("stylelint-formatter-pretty");

const webpack_entries = {
  raw: [`${process.env.SRC}/base/index.js`],
  parsed: {}
};

for (let i = 0; i < webpack_entries.raw.length; i++) {
  let extension = path.extname(webpack_entries.raw[i]);
  let key = webpack_entries.raw[i]
    .replace(process.env.SRC, "")
    .replace(extension, "");

  webpack_entries.parsed[key] = webpack_entries.raw[i];
}

module.exports = {
  mode: "none",
  entry: webpack_entries.parsed,
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
