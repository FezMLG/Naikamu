module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@naikamu/shared': '../../lib/shared',
          '@naikamu/translations': '../../lib/translations',
        },
      },
    ],
    ['react-native-worklets/plugin'],
  ],
};
