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
    ];

    return rules;
  }
};
