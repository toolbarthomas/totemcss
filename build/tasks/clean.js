/**
 * Workflow for removing the build folder defined within the environment file.
 */
(module.exports = () => {
  require("../config/env")();

  const del = require("del");
  const fs = require("fs");

  if (!fs.existsSync(process.env.DIST)) {
    return;
  }

  del([
    `${process.env.DIST}/base`,
    `${process.env.DIST}/modules`,
    `${process.env.DIST}/pages`,
    `${process.env.DIST}/templates`
  ]);
})();
