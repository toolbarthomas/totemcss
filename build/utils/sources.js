const glob = require("glob");
const path = require("path");

/**
 * Output an entry object with sources for Webpack.
 *  Each source will be scaffoled into the destination path
 *    defined within the environment file.
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
          let dirname = source
            .replace(process.env.SRC, "")
            .replace(extension, "");

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

    let base_path = path.join(process.env.SRC, "/base/javascripts/index.js");
    matches["base"] = await glob.sync(`./${base_path}`);

    let modules_path = path.join(
      process.env.SRC,
      "/modules/*/javascripts/index.js"
    );
    matches["modules"] = await glob.sync(`./${modules_path}`);

    return matches;
  } catch (error) {
    throw error;
  }
};
