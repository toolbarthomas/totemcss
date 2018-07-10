const chalk = require("chalk");
/**
 * Outputs a notice in blue
 *
 * @param {String} message
 */
exports.notice = function(message) {
  if (!message) {
    return;
  }

  console.log(chalk.cyan(message));
};

/**
 * Outputs warning in orange
 *
 * @param {String} message
 */
exports.warning = function(message) {
  if (!message) {
    return;
  }

  console.log(chalk.yellow("[ warning ] - " + message));
};

/**
 * Outputs message in red & stops the current process.
 *
 * @param {String} error
 */
exports.error = function(error) {
  if (!error) {
    return;
  }

  console.log(chalk.red("[ error ] - " + error));
  process.exit(1);
};
