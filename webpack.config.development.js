/**
 * Webpack configuration overrides for the `development` environment.
 *  This configuration will be used if an environment has has been defined
 *    within the dotenv environment file.
 */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  plugins: [
    /**
     * Webpack will parse our initial stylesheet from the base entry file: base/index.js
     */
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
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "abc"
            }
          },
          "css-loader"
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, process.env.DIST),
    compress: true,
    port: process.env.PORT
  }
};
