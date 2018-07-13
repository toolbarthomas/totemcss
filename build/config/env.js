/**
 * Defines the environment variables for this application
 *  from the dotenv environment file.
 *
 * @see: https://www.npmjs.com/package/dotenv
 */
module.exports = () => {
  const fs = require("fs");
  const dotenv = process.cwd() + "/.env";
  const chalk = require("chalk");

  /**
   * Create a new environment file for our application if no
   * environment file has been found.
   */
  if (!fs.existsSync(dotenv)) {
    return fs.writeFile(dotenv, "", "utf8", error => {
      if (error) {
        throw error;
      }

      console.info(
        chalk.yellow(
          `No environment ('.env') file has been defined. A fresh new copy has been made within: ${process.cwd()}`
        )
      );

      return _parseConfig(dotenv);
    });
  } else {
    return _parseConfig(dotenv);
  }

  function _parseConfig(dotenv) {
    /**
     * Define the actual environment variables from the environment file
     */
    const config = require("dotenv").config({
      path: dotenv
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
    console.info(
      chalk.cyan(`Environment configuration loaded from: ${dotenv}`)
    );

    /**
     * Also return the ENVIRONMENT configuration constants.
     */
    return config;
  }
};
