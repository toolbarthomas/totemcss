/**
 * Global configuration file for all defined environments.
 */

const path = require("path");
const _ = require("lodash");

const webpack = {
  entries: require("./build/index").getWebpackEntries() || {},
  plugins: _.merge(require("./build/tasks/styles").setPlugin()),
  rules: _.merge(require("./build/tasks/styles").setRuleset())
};

module.exports = {
  mode: "none",
  entry: webpack["entries"],
  stats: "minimal",
  output: {
    path: path.resolve(__dirname, process.env.DIST),
    filename: "[name].js"
  },
  plugins: webpack["plugins"],
  module: {
    rules: webpack["rules"]
  }
};
