module.exports = function (api) {
    api.cache(true)
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'babel-plugin-styled-components',
            '@babel/plugin-proposal-export-namespace-from',
            [
                'module-resolver',
                {
                    alias: { '~/*': ['./src/*'] },
                },
            ],
        ],
    }
}
