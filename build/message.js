const chalk = require("chalk");

/**
 * Logs warnings in yellow.
 *
 * @param {String} message
 */
exports.warning = function(message) {
  if (!message) {
    return;
  }

  console.log(chalk.yellow("[ Totemcss ] - " + message));
};

/**
 * Logs erros in red and stops the current process.
 *
 * @param {String} error
 */
exports.error = function(error) {
  if (!error) {
    return;
  }

  console.log(chalk.red("[ Totemcss ] - " + error));
  process.exit(1);
};
