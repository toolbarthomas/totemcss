/**
 * Config utility for generating the entry object for Webpack.
 * Entries are converted to an object to keep the folder structure
 * within the current build.
 */
module.exports = {
  webpackEntries: () => {
    const glob = require("glob");
    const path = require("path");

    const base = [`${process.env.SRC}/base/index.js`];
    const modules = glob.sync(`${process.env.SRC}/modules/*/index.js`);
    const entries = base.concat(modules);

    if (entries == null || entries.length === 0) {
      return {};
    }

    let webpack_entries = {};

    /**
     * Convert the `entries` array to an object to keep
     * the current folder structure during the build.
     */
    for (let i = 0; i < entries.length; i++) {
      let extension = path.extname(entries[i]);
      let key = entries[i].replace(process.env.SRC, "").replace(extension, "");

      webpack_entries[key] = entries[i];
    }

    return webpack_entries || {};
  }
};
