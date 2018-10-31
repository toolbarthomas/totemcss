const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require("glob");

module.exports = {
  /**
   * Defines the styles-related plugin for Webpack
   */
  setPlugin: () => {
    let plugins = [
      new HtmlWebpackPlugin({
        template: `${process.env.SRC}/index.html`
      })
    ];

    return plugins;
  }
};
