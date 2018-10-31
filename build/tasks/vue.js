const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  /**
   * Defines the styles-related plugin for Webpack
   */
  setPlugin: () => {
    let plugins = [new VueLoaderPlugin()];

    return plugins;
  },

  /**
   * Defines the styles-related rules for Webpack
   */
  setRuleset: () => {
    let rules = [
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.js$/,
        use: "babel-loader"
      }
    ];

    return rules;
  }
};
