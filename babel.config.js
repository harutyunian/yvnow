module.exports = function (api) {
    api.cache(true);
    const isProd = process.env.NODE_ENV === 'production';

    return {
        presets: ['module:metro-react-native-babel-preset'],
        plugins: [
            ['@babel/plugin-transform-class-properties', { loose: false }],
            ['@babel/plugin-transform-private-methods', { loose: false }],
            ['@babel/plugin-transform-private-property-in-object', { loose: false }],
            isProd && 'babel-plugin-transform-remove-console',
            'react-native-reanimated/plugin' // always last
        ].filter(Boolean),
    };
};
