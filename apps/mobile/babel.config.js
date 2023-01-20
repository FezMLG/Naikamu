module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        alias: {
          '@aniwatch/shared': '../../lib/shared',
        },
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
};
