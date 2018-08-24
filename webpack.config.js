/**
 * Initial configuration file for Webpack.
 * This file will be initialy used by Webpack.
 * All extra logic related to Totemcss will be required
 *  within this file to set all required functionality.
 *
 * Totemcss will define `webpack.config.common.js` as default
 * configuration file for Webpack.
 *
 * `webpack.config.common.js` will be globally used within Webpack.
 *
 * You can define environment specific configuration for Webpack
 *  by defining the `ENVIRONMENT` const within `./.env` file.
 * A Webpack configuration file for a specific environment can be set
 *   by creating `webpack.config.${ENVIRONMENT}.js` next to all other
 *    configuration files for webpack.
 * For example: `webpack.config.production.js` should exist if `production`
 *  would be the `ENVIRONMENT` value.
 */

const env = require("./build/index").getEnvironment();
const webpack_config = require("./build/index").getWebpackConfig();

module.exports = webpack_config || {};
