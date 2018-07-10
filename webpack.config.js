const path = require("path");

module.exports = {
  mode: "none",
  entry: false,
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js"
  }
};
