module.exports = (GULP, GULP_PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {
        // GULP_PLUGINS.watch([
        //     process.env.TOTEMCSS_SRC + '/totemcss/**',
        //     '!**/totemcss/**/*.{scss,md,twig,html,js}',
        //     '!**/totemcss/**/stylesheets/**/*.scss',
        //     '!**/totemcss/**/javascripts/**/*.js',
        //     '!**/totemcss/**/svg-sprite/**/*.svg',
        //     '!**/totemcss/**/sprite/**/*.png'
        // ], {
        //     read: false
        // }, function () {
        //     return GULP.start('sync');
        // });

        GULP_PLUGINS.watch([
            process.env.TOTEMCSS_SRC + '/totemcss/**/stylesheets/**/*.scss',
            process.env.TOTEMCSS_PACKAGES + '/totemcss*/stylesheets/**/*.scss',
        ], function () {
            return GULP.start('stylesheets');
        });

        // GULP_PLUGINS.watch([
        //     process.env.TOTEMCSS_SRC + '/totemcss/**/javascripts/**/*.js',
        //     process.env.TOTEMCSS_PACKAGES + '/totemcss*/javascripts/**/*.js',
        //     '!**/lib/**/*.js'
        // ], function () {
        //     return GULP.start('javascripts');
        // });

        // GULP_PLUGINS.watch([
        //     process.env.TOTEMCSS_SRC + '/totemcss/**/svg-sprite/**/*.svg',
        // ], function () {
        //     return GULP.start('svgstore');
        // });

        // GULP_PLUGINS.watch([
        //     process.env.TOTEMCSS_SRC + '/totemcss/**/sprite/**/*.png',
        // ], function () {
        //     return GULP.start('spritesmith');
        // });

        // GULP_PLUGINS.watch([
        //     './data.json',
        //     process.env.TOTEMCSS_PACKAGES + '/data.json',
        //     process.env.TOTEMCSS_SRC + '/totemcss/**/*.twig',
        //     process.env.TOTEMCSS_PACKAGES + '/totemcss*/**/*.twig',
        // ], function () {
        //     return GULP.start('twig');
        // });
    }
}