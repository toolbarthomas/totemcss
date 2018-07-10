const glob = require("glob");
const path = require("path");

/**
 * Output an entry object with sources for Webpack.
 */
exports.globSources = async function() {
  try {
    let sources = {};
    await _parseGlobSources().then(matches => {
      if (matches == null) {
        return;
      }

      Object.keys(matches).forEach(key => {
        for (let i = 0; i < matches[key].length; i++) {
          let source = matches[key][i];

          let extension = path.extname(source);
          let dirname = source.replace("./src", "").replace(extension, "");

          sources[dirname] = source;
        }
      });
    });
    return sources;
  } catch (error) {
    throw error;
  }
};

/**
 * Asynchronous function for generating Webpack's entry list.
 */
_parseGlobSources = async function() {
  try {
    const matches = {};
    matches["base"] = await glob.sync("./src/base/javascripts/index.js");
    matches["modules"] = await glob.sync(
      "./src/modules/*/javascripts/index.js"
    );
    return matches;
  } catch (error) {
    throw error;
  }
};
