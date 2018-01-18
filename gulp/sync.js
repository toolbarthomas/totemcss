module.exports = (GULP, GULP_PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback)
    {
        // Prevent syncing development files
        var sync_ignores = [
            '!' + process.env.TOTEMCSS_SRC + '/totemcss/**/sprite/**',
            '!' + process.env.TOTEMCSS_SRC + '/totemcss/**/svg-sprite/**',
            '!' + process.env.TOTEMCSS_SRC + '/totemcss/modules/**/javascripts/**',
            '!' + process.env.TOTEMCSS_SRC + '/totemcss/groups/**/javascripts/**',
            '!' + process.env.TOTEMCSS_SRC + '/totemcss/templates/**/javascripts/**',
            '!' + process.env.TOTEMCSS_SRC + '/**/**.{scss,md,twig,html}',
            '!' + process.env.TOTEMCSS_SRC + '/totemcss/**/data.json'
        ];

        var sources = [
            {
                input: [
                    process.env.TOTEMCSS_SRC + '/browserconfig.xml'
                ],
                output: process.env.TOTEMCSS_DIST,
                options: {
                    nodir: true
                }
            },
            {
                input: [
                    process.env.TOTEMCSS_SRC + '/totemcss/**',
                ].concat(sync_ignores),
                output: process.env.TOTEMCSS_DIST + '/totemcss',
                options: {
                    nodir: true
                }
            }
        ];

        var streams = [];

        sources.forEach(function(source) {
            var stream = GULP.src(source.input, source.options)
                .pipe(GULP_PLUGINS.cached('sync'))
                .pipe(GULP_PLUGINS.filter(function (file) {
                    return file.stat && file.contents.length;
                }))
                .pipe(GULP.dest(source.output));

            streams.push(stream);
        });

        return NODE_MODULES.merge(streams);
    }
}