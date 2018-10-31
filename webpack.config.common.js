/**
 * Global configuration file for all defined environments.
 */

const path = require("path");
const _ = require("lodash");

const config = {
  plugins: _.merge(
    require("./build/tasks/vue").setPlugin(),
    require("./build/tasks/styles").setPlugin(),
    require("./build/tasks/templates").setPlugin()
  ),
  rules: _.merge(
    require("./build/tasks/vue").setRuleset(),
    require("./build/tasks/styles").setRuleset()
  )
};

module.exports = {
  mode: "none",
  entry: `${process.env.SRC}/index.js`,
  stats: "minimal",
  output: {
    path: path.join(__dirname, process.env.DIST),
    publicPath: "",
    filename: "index.bundle.js"
  },
  plugins: config["plugins"],
  module: {
    rules: config["rules"]
  }
};
