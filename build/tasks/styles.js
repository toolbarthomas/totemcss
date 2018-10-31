const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  /**
   * Defines the styles-related plugin for Webpack
   */
  setPlugin: () => {
    let plugins = [
      new MiniCssExtractPlugin({
        filename: "[name].css"
      })
    ];

    return plugins;
  },

  /**
   * Defines the styles-related rules for Webpack
   */
  setRuleset: () => {
    let rules = [
      {
        test: /\.css$/,
        use: [
          process.env.ENVIRONMENT === "development"
            ? "vue-style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      }
    ];

    return rules;
  }
};
