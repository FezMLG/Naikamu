module.exports = {
  presets: ['babel-preset-expo'],
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
