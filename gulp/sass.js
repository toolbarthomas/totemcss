module.exports = (GULP, GULP_PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback)
    {
        // Define the properties for each category
        var sources = [
            {
                input: [
                    process.env.TOTEMCSS_SRC + '/assets/main/stylesheets/*.scss'
                ],
                output: process.env.TOTEMCSS_DIST + '/assets/main/stylesheets'
            },
            {
                input: [
                    process.env.TOTEMCSS_SRC + '/assets/modules/*/stylesheets/*.scss',
                    process.env.TOTEM_SUBMODULES + '/totem.module.*/stylesheets/*.scss'
                ],
                output: process.env.TOTEMCSS_DIST + '/assets/modules'
            },
            {
                input: [
                    process.env.TOTEMCSS_SRC + '/assets/groups/*/stylesheets/*.scss',
                    process.env.TOTEM_SUBMODULES + '/totem.group.*/stylesheets/*.scss'
                ],
                output: process.env.TOTEMCSS_DIST + '/assets/groups'
            },
            {
                input: [
                    process.env.TOTEMCSS_SRC + '/assets/templates/*/stylesheets/*.scss',
                    process.env.TOTEM_SUBMODULES + '/totem.template.*/stylesheets/*.scss',
                ],
                output: process.env.TOTEMCSS_DIST + '/assets/templates'
            }
        ];

        var streams = [];

        sources.forEach(function (source) {

            var stream = GULP.src(source.input)
                .pipe(GULP_PLUGINS.sourcemaps.init())
                .pipe(GULP_PLUGINS.sassGlob())
                .pipe(GULP_PLUGINS.sass().on('error', GULP_PLUGINS.sass.logError))
                .pipe(GULP_PLUGINS.autoprefixer())
                .pipe(GULP_PLUGINS.sourcemaps.write('./'))
                .pipe(GULP.dest(source.output))

            streams.push(stream);
        }, this);

        return NODE_MODULES.merge(streams).pipe(GULP_PLUGINS.livereload({
            quiet: true
        }));
    }
}