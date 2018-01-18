'use strict';

// Require environment variabels from .env
// We use these variables to set a custom src/dist path
// for our gulp tasks
const ENV = require('dotenv').config();


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
    chalk: require('chalk'),
    del: require('del'),
    fse: require('fs-extra'),
    merge: require('merge-stream'),
    path: require('path'),
    runSequence: require('run-sequence').use(GULP)
};


// Throw an error & abort the Gulp process
// if there is no environment file
if (ENV.error) {
    console.log(NODE_MODULES.chalk.red('[ Totemcss ] - An environment (./.env) file is required for this workflow. You can create one by duplicating ./.env.dist example. This file should be located in ' + process.cwd()));
    process.exit(1);
}


// Throw an error & abort the Gulp process
// when one or more of the following environment variables are undefined
if (!process.env.TOTEMCSS_SRC || !process.env.TOTEMCSS_SRC || !process.env.TOTEMCSS_PACKAGES) {
    console.log(NODE_MODULES.chalk.red('The src path from our .env file is not defined, please check again.'));
    process.exit(1);
}


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

// Gulp task that runs all stylesheet specific tasks
GULP.task('sync', requireGulpTask('sync'));

// Generates a .png sprite & Sass stylesheet
GULP.task('spritesmith', requireGulpTask('spritesmith'));

// Runs Node Sass and creates stylesheets
// For each Totemcss package
GULP.task('sass', requireGulpTask('sass'));

// Generates a .svg sprite that should
// be used as an inline sprite within your project
GULP.task('svgstore', requireGulpTask('svgstore'));

// Runs all stylesheet related task asynchronous
GULP.task('stylesheets', function (callback) {
    NODE_MODULES.runSequence(
        'spritesmith',
        [
            'sass',
            'svgstore'
        ],
        callback
    );
});

// Default Gulp task that will run all
// the necessary tasks to generate a development ready build
GULP.task('default', function (callback) {
    NODE_MODULES.runSequence(
        'clean',
        'sync',
        [
            'stylesheets'
        ],
        callback
    );
});


