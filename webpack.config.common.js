const path = require("path");

const webpack_entries = {
  raw: [`${process.env.SRC}/base/index.js`],
  parsed: {}
};

for (let i = 0; i < webpack_entries.raw.length; i++) {
  let extension = path.extname(webpack_entries.raw[i]);
  let key = webpack_entries.raw[i]
    .replace(process.env.SRC, "")
    .replace(extension, "");

  webpack_entries.parsed[key] = webpack_entries.raw[i];
}

module.exports = {
  mode: "none",
  entry: webpack_entries.parsed,
  output: {
    path: path.resolve(__dirname, process.env.DIST),
    filename: "[name].js"
  }
};
