const glob = require("glob");

const plugins = {
  HtmlWebpackPlugin: require("html-webpack-plugin")
};

module.exports = {
  getTemplates: () => {
    let templates = glob.sync(`${process.env.SRC}/templates/*.html.twig`);

    if (!templates.length) {
      return {};
    }

    let templateRegistry = [];

    for (let i = 0; i < templates.length; i++) {
      let template = new plugins.HtmlWebpackPlugin({
        template: templates[i],
        inject: false
      });

      templateRegistry.push(template);
    }

    return templateRegistry;
  }
};
