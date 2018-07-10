const fs = require("fs");
const webpack = require("webpack");
const merge = require("webpack-merge");

const message = require("./message.js");
const sources = require("./sources.js");

/**
 * Check if there is any dotenv file is defined, otherwise create one.
 */
if (!fs.existsSync(".env")) {
  fs.writeFile(".env", "", "utf8", error => {
    if (error) {
      throw error;
    }

    message.warning(
      `No environment file has been defined. A fresh new copy has been made within: ${process.cwd()}`
    );
  });
}

/**
 * Load environment variables from a `.env` file into `process.env`.
 *  Environment variables can be accessed with the process.env variable.
 */
const ENV = require("dotenv").config();

/**
 * Define the current environment for our application.
 *  Fallback to `production` if no environment has been set within `./.env`.
 */
process.env.ENVIRONMENT = process.env.ENVIRONMENT || "production";

/**
 * Load up the common configuration for Webpack.
 *  Environment specific configuration can be set within .
 */
let webpack_config = require("../webpack.config.js");

/**
 * Try to load an environment specific configuration file.
 *  Override and append any excisting options defined from `webpack.config.js`.
 */
let webpack_config_from_environment = `../webpack.config.${process.env.ENVIRONMENT.toLowerCase()}.js`;

if (fs.existsSync(webpack_config_from_environment)) {
  webpack_config = merge(webpack_config, webpack_config_from_environment);
} else {
  message.warning(
    "The environment has been defined within './.env' but the specific Webpack configuration doesn't exists."
  );

  message.warning(
    `Be sure to create a Webpack configuration file at '${webpack_config_from_environment}' if you have an environment specific build flow.`
  );
}

/**
 * Generates a dynamic source list within source directory
 *  by using globbing patterns and fire up Webpack.
 */
sources.globSources().then(sources => {
  webpack_config["entry"] = sources;

  webpack(webpack_config, (error, stats) => {
    if (error) {
      throw error;
    }

    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        chunks: false,
        chunkModules: false
      }) + "\n\n"
    );
  });
});
