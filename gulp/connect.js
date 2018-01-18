module.exports = (GULP, GULP_PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback)
    {
        return GULP_PLUGINS.connect.server({
            root: process.env.TOTEMCSS_DIST,
            livereload: true,
            port: 8888,
        });
    }
}