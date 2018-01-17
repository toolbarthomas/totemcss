// Concat all Javascript file

module.exports = (GULP, GULP_PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback)
    {
        var sources = [
            {
                input: [
                    process.env.TOTEMCSS_DIST + '/totemcss/modules/**/javascripts/**/*.js'
                ],
                output: process.env.TOTEMCSS_DIST + '/totemcss/main/javascripts',
                file_name: 'modules.bundle.js'
            }
        ];

        var streams = [];
        sources.forEach(function (source) {
            var stream = GULP.src(source.input, {
                nodir: true,
                base: '.'
            })
            .pipe(GULP_PLUGINS.sourcemaps.init())
            .pipe(GULP_PLUGINS.concat(source.file_name))
            .pipe(GULP_PLUGINS.sourcemaps.write('./'))
            .pipe(GULP.dest(source.output));

            streams.push(stream);
        }, this);

        return NODE_MODULES.merge(streams);
    }
}