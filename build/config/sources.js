/**
 * Config utility for generating the entry object for Webpack.
 * Sources are converted to an object to keep the folder structure
 * within the current build.
 */
module.exports = {
  webpakSources: () => {
    const glob = require("glob");
    const path = require("path");

    const base = [`${process.env.SRC}/base/index.js`];
    const modules = glob.sync(`${process.env.SRC}/modules/*/index.js`);
    const sources = base.concat(modules);

    if (sources == null || sources.length === 0) {
      return {};
    }

    let webpack_entries = {};

    /**
     * Convert the `sources` array to an object to keep
     * the current folder structure during the build.
     */
    for (let i = 0; i < sources.length; i++) {
      let extension = path.extname(sources[i]);
      let key = sources[i].replace(process.env.SRC, "").replace(extension, "");

      webpack_entries[key] = sources[i];
    }

    return webpack_entries || {};
  }
};
