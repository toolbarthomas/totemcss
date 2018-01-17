module.exports = (GULP, GULP_PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback)
    {
        // Prevent syncing development files
        var sync_ignores = [
            '!' + process.env.TOTEMCSS_SRC + '/assets/**/sprite/**',
            '!' + process.env.TOTEMCSS_SRC + '/assets/**/svg-sprite/**',
            '!' + process.env.TOTEMCSS_SRC + '/assets/modules/**/javascripts/**',
            '!' + process.env.TOTEMCSS_SRC + '/assets/groups/**/javascripts/**',
            '!' + process.env.TOTEMCSS_SRC + '/assets/templates/**/javascripts/**',
            '!' + process.env.TOTEMCSS_SRC + '/**/**.{scss,md,twig,html}',
            '!' + process.env.TOTEMCSS_SRC + '/assets/**/data.json'
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
                    process.env.TOTEMCSS_SRC + '/assets/**',
                ].concat(sync_ignores),
                output: process.env.TOTEMCSS_DIST + '/assets',
                options: {
                    nodir: true
                }
            }
        ];

        var streams = [];

        sources.forEach(function(source) {
            var stream = GULP.src(source.input, source.options)
                .pipe(GULP_PLUGINS.filter(function (file) {
                    return file.stat && file.contents.length;
                }))
                .pipe(GULP.dest(source.output));

            streams.push(stream);
        });

        return NODE_MODULES.merge(streams);
    }
}