const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  plugins: () => {
    let plugins = [
      new HtmlWebpackPlugin({
        template: `${process.env.SRC}/templates/index.html.twig`
      })
    ];

    return plugins;
  },
  rules: () => {
    let rules = [
      {
        test: /\.html.twig$/,
        use: [
          {
            loader: "render-template-loader",
            options: {
              quiet: true,
              engine: "twig",
              locals: {
                title: "Render Template Loader",
                desc: "Rendering templates with a Webpack loader since 2017"
              },
              engineOptions: function(info) {
                return {
                  namespaces: {
                    totemcss: path.join(process.cwd(), process.env.SRC),
                    totemcss_packages: path.join(
                      process.cwd(),
                      "../totemcss_packages"
                    )
                  },
                  filename: info.filename
                };
              }
            }
          }
        ]
      }
    ];

    return rules;
  }
};
