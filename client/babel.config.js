module.exports = function (api) {
    api.cache(false);
    return {
        plugins: ['macros'],
    }
}