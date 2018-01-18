module.exports = (GULP, GULP_PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback)
    {
        // Define the properties for each category
        var sources = [
            {
                input: [
                    process.env.TOTEMCSS_SRC + '/totemcss/main/stylesheets/*.scss'
                ],
                output: process.env.TOTEMCSS_DIST + '/totemcss/main/stylesheets'
            },
            {
                input: [
                    process.env.TOTEMCSS_SRC + '/totemcss/modules/*/stylesheets/*.scss',
                    process.env.TOTEMCSS_PACKAGES + '/totemcss-module*/stylesheets/*.scss'
                ],
                output: process.env.TOTEMCSS_DIST + '/totemcss/modules'
            },
            {
                input: [
                    process.env.TOTEMCSS_SRC + '/totemcss/groups/*/stylesheets/*.scss',
                    process.env.TOTEMCSS_PACKAGES + '/totemcss-group*/stylesheets/*.scss'
                ],
                output: process.env.TOTEMCSS_DIST + '/totemcss/groups'
            },
            {
                input: [
                    process.env.TOTEMCSS_SRC + '/totemcss/templates/*/stylesheets/*.scss',
                    process.env.TOTEMCSS_PACKAGES + '/totemcss-template*/stylesheets/*.scss',
                ],
                output: process.env.TOTEMCSS_DIST + '/totemcss/templates'
            }
        ];

        var streams = [];

        sources.forEach(function (source) {

            var stream = GULP.src(source.input)
                .pipe(GULP_PLUGINS.cached('sass'))
                .pipe(GULP_PLUGINS.sourcemaps.init())
                .pipe(GULP_PLUGINS.sassGlob())
                .pipe(GULP_PLUGINS.sass().on('error', GULP_PLUGINS.sass.logError))
                .pipe(GULP_PLUGINS.autoprefixer())
                .pipe(GULP_PLUGINS.sourcemaps.write('./'))
                .pipe(GULP.dest(source.output))

            streams.push(stream);
        }, this);

        return NODE_MODULES.merge(streams).pipe(GULP_PLUGINS.connect.reload());
    }
}