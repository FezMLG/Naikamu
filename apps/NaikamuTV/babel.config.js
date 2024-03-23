module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@naikamu/shared': '../../lib/shared',
        },
      },
    ],
    'babel-plugin-styled-components',
  ],
};
