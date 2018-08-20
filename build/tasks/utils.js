const env = require("../config/env")();
const del = require("del");
const fs = require("fs");

/**
 * Utility methods for usable for the totemcss
 */
module.exports = {
  clean: function() {
    if (!fs.existsSync(process.env.DIST)) {
      return;
    }

    del([
      `${process.env.DIST}/base`,
      `${process.env.DIST}/modules`,
      `${process.env.DIST}/pages`,
      `${process.env.DIST}/templates`
    ]);
  }
};
