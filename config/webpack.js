/**
 * Defines the Webpack configuration object from `webpack.config.js`.
 *  Also merges environment specific configuration it the application
 *    has an environment defined within the environment file.
 */
module.exports = () => {
  const env = require("./env");

  const chalk = require("chalk");
  const fs = require("fs");
  const merge = require("webpack-merge");

  /**
   * Define the common Webpack configuration we use for all environments.
   */
  let webpack_common_config = require("../webpack.config.common");

  /**
   * Define the secondary Webpack configuration path from
   *  the given `ENVIRONMENT` variable.
   */
  let webpack_environment_config = `${process.cwd()}/webpack.config.${process.env.ENVIRONMENT.toLowerCase()}.js`;

  /**
   * Define the actual config file for Webpack
   */
  let webpack_config = {};

  if (fs.existsSync(webpack_environment_config)) {
    webpack_config = merge(
      webpack_common_config,
      require(webpack_environment_config)
    );
  } else {
    webpack_config = webpack_common_config;

    console.info(
      chalk.yellow(
        "The environment has been defined within './.env' but the specific Webpack configuration doesn't exists."
      )
    );
    console.info(
      chalk.yellow(
        `Be sure to create a Webpack configuration specific for ${
          process.env.ENVIRONMENT
        }.`
      )
    );
  }

  return webpack_config;
};
