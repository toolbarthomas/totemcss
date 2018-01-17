// Gulp task for cleanup up the syncronized files

module.exports = (GULP, GULP_PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback)
    {
        return NODE_MODULES.del([
            process.env.TOTEMCSS_DIST + '/assets'
        ]);
    }
}