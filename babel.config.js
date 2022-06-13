module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: [
            '.web.js',
            '.js',
            '.jsx',
            '.json',
            '.web.ts',
            '.ts',
            '.web.tsx',
            '.tsx',
          ],
          alias: {
            lib: './lib',
            config: './config',
            assets: './assets',
            screens: './screens',
            components: './components',
            store: './store',
            styles: './styles',
            navigation: './navigation',
            hooks: './hooks',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
