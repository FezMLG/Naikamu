module.exports = {
  presets: ['module:@react-native/babel-preset'],
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
    ['react-native-reanimated/plugin'],
  ],
};
