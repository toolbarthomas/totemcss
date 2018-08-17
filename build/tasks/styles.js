const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: () => {
    let plugins = [
      new MiniCssExtractPlugin({
        filename: "[name].css"
      })
    ];

    return plugins;
  },
  rules: () => {
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
          "css-loader"
        ]
      }
    ];

    return rules;
  }
};
