// Bundle each javascript module with Browserify
// This script will fetch all main files for each module and will generate an ES6 compatible module with

module.exports = (GULP, GULP_PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {

        // Define all module locations in a globbing pattern (including your external packages: bower, NPM etc.)
        var sources = [
            {
                input: [
                    process.env.TOTEMCSS_SRC + '/totemcss/modules/*/javascripts/*.js',
                    process.env.TOTEMCSS_PACKAGES + '/totemcss-module*/javascripts/*.js'
                ],
                output: process.env.TOTEMCSS_DIST + '/totemcss/modules',
            },
            {
                input: [
                    process.env.TOTEMCSS_SRC + '/totemcss/groups/*/javascripts/*.js',
                    process.env.TOTEMCSS_PACKAGES + '/totemcss-group*/javascripts/*.js'
                ],
                output: process.env.TOTEMCSS_DIST + '/totemcss/groups',
            },
            {
                input: [
                    process.env.TOTEMCSS_SRC + '/totemcss/templates/*/javascripts/*.js',
                    process.env.TOTEMCSS_PACKAGES + '/totemcss-template*/javascripts/*.js'
                ],
                output: process.env.TOTEMCSS_DIST + '/totemcss/templates',
            }
        ];

        var streams = [];

        sources.forEach(function(source) {
            var stream = GULP.src(source.input)
            .pipe(GULP_PLUGINS.plumber())
            .pipe(GULP_PLUGINS.filter(function (file) {
                return file.stat && file.contents.length;
            }))
            .pipe(GULP_PLUGINS.tap(function (file) {
                var basename = NODE_MODULES.path.basename(file.path);
                var ext = NODE_MODULES.path.extname(basename);
                var name = NODE_MODULES.path.basename(file.path, ext);

                // replace file contents with browserify's bundle stream
                file.contents = NODE_MODULES.browserify(file.path, {
                    debug: true,
                    standalone: NODE_MODULES.camelCase(name)
                }).bundle()
                .on('error', function (error) {
                    console.log(error);

                    this.emit('end');
                });
            }))
            .pipe(GULP_PLUGINS.buffer())            // transform streaming contents into buffer contents (because gulp-sourcemaps does not support streaming contents)
            .pipe(GULP_PLUGINS.sourcemaps.init({ loadMaps: true })) //load and init sourcemaps
            .pipe(GULP_PLUGINS.sourcemaps.write('./'))
            .pipe(GULP.dest(source.output));

            streams.push(stream);
        }, this);

        return NODE_MODULES.merge(streams);
    }
}