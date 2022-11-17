module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],
    ['react-native-reanimated/plugin'],
    [
      'module-resolver',
      {
        alias: {
          '@aniwatch/shared': '../../lib/shared',
        },
      },
    ],
  ],
};
