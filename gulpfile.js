'use strict';

// Require environment variabels from .env
// We use these variables to set a custom src/dist path
// for our gulp tasks
const ENV = require('dotenv').config();


// Throw an error & abort the Gulp process
// if there is no environment file
if(ENV.error) {
    throw '[ Totemcss ] - An environment (./.env) file is required for this workflow. You can create one by duplicating ./.env.dist example. This file should be located in ' + process.cwd();
}


// Throw an error & abort the Gulp process
// when one or more of the following environment variables are undefined
if (!process.env.TOTEMCSS_SRC || !process.env.TOTEMCSS_SRC || !process.env.TOTEMCSS_PACKAGES || !process.env.TOTEMCSS_GENERATOR_DEST) {
    throw 'The src path from our .env file is not defined, please check again.';
}


// We use Gulp for our build system
// Each gulp task is defined as a seperate task located in ./gulp
const GULP = require('gulp');


// Autoload all Gulp modules that are installed from the package.json
// More information: https://www.npmjs.com/package/gulp-load-plugins
const GULP_PLUGINS = require('gulp-load-plugins')();


// Require all modules we use for our
// gulp tasks located in ./gulp
const NODE_MODULES = {
    babelify: require('babelify'),
    browserify: require('browserify'),
    buffer: require('vinyl-buffer'),
    camelCase: require('camelcase'),
    del: require('del'),
    fse: require('fs-extra'),
    merge: require('merge-stream'),
    path: require('path'),
    runSequence: require('run-sequence').use(GULP)
};


// Create a revision timesamp of the current date in milliseconds.
// We use this timestamp as suffix for some generated files: i.e. spritesmith.js
const REVISION = new Date().getTime();


// Simple helper for requiring Gulp tasks defined in seperate files
// Each Gulp is located within ./gulp
function requireGulpTask(file) {
    return require('./gulp/' + file)(GULP, GULP_PLUGINS, NODE_MODULES, REVISION);
}

// Gulp task that cleans up the distribution folder
// before processing any new streams
GULP.task('clean', requireGulpTask('clean'));

// Gulp task that syncs static assets & libriaries
// Any generator files i.e. .scss,.twig.. will ben ignored.
GULP.task('sync', requireGulpTask('sync'));

GULP.task('default', function (callback) {
    NODE_MODULES.runSequence(
        'clean',
        'sync',
        callback
    );
});


