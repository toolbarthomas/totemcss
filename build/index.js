"use strict";

const chalk = require("chalk");
const fs = require("fs");
const webpack = require("webpack");

/**
 * Check if there is any dotenv file is defined, otherwise create one.
 */
if (!fs.existsSync(".env")) {
  fs.writeFile(".env", "", "utf8", error => {
    if (error) {
      throw error;
    }

    console.log(
      chalk.yellow(
        `No environment file has been defined. A fresh new copy has been made within: ${process.cwd()}`
      )
    );
  });
}

/**
 * Load environment variables from a `.env` file into `process.env`.
 *  Environment variables can be accessed with the process.env variable.
 */
const ENV = require("dotenv").config();

process.env.ENVIRONMENT ? process.env.ENVIRONMENT : "production";

webpack(config);
