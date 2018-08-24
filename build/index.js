const fs = require("fs");
const chalk = require("chalk");
const glob = require("glob");
const path = require("path");
const webpackMerge = require("webpack-merge");

module.exports = {
  /**
   * Define an environment for the current application.
   * An environment can be configured be creating a .env file within the
   * project root.
   */
  getEnvironment: function() {
    const env = process.cwd() + "/.env";

    /**
     * Create a new environment file for our application if no
     * environment file has been found.
     */
    if (!fs.existsSync(env)) {
      return fs.writeFile(env, "", "utf8", error => {
        if (error) {
          throw error;
        }

        console.info(
          chalk.yellow(
            `No environment ('.env') file has been defined. A fresh new copy has been made within: ${process.cwd()}`
          )
        );

        return module.exports.setEnvironment(env);
      });
    } else {
      return module.exports.setEnvironment(env);
    }
  },

  /**
   * Define the actual environment variables from the environment file
   */
  setEnvironment: function(env) {
    const config = require("dotenv").config({
      path: env
    });

    /**
     * Validate the parsed environment file throw an exception if any errors
     */
    if (config.error) {
      throw config.error;
    }

    /**
     * Define the current environment for the application.
     *  Fallback to `production` if no `ENVIRONMENT` key is present.
     */
    process.env.ENVIRONMENT = process.env.ENVIRONMENT || "production";

    /**
     * Define the default path we use during development.
     *  Fallback to `./src` if there is no `SRC` variable.
     */
    process.env.SRC = process.env.SRC || "./src";

    /**
     * Define the default path we use during development.
     *  Fallback to `./dist` if there is no `DIST` variable.
     */
    process.env.DIST = process.env.DIST || "./dist";

    /**
     * Define the default port number for our development server.
     *  Use port `8000` if there is no `PORT` variable.
     */
    process.env.PORT = process.env.PORT || 8000;

    /**
     * Notify the user that the environment configration is loaded
     */
    console.info(chalk.cyan(`Environment configuration loaded from: ${env}`));

    /**
     * Also return the ENVIRONMENT configuration constants.
     */
    return config;
  },

  /**
   * Define the common Webpack configuration we use for all environments.
   */
  getWebpackConfig: function() {
    let webpack_common_config = require(`${process.cwd()}/webpack.config.common`);

    /**
     * Define the secondary Webpack configuration path from
     * the given `ENVIRONMENT` variable.
     */
    let webpack_environment_config = `${process.cwd()}/webpack.config.${process.env.ENVIRONMENT.toLowerCase()}.js`;

    /**
     * Define the actual config file for Webpack
     */
    let webpack_config = {};

    if (fs.existsSync(webpack_environment_config)) {
      webpack_config = webpackMerge(
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
  },

  /**
   *
   */
  getWebpackEntries: function() {
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
