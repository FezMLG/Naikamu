const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  watchFolders: [
    path.resolve(__dirname + '/../../lib/translations/'),
    path.resolve(__dirname + '/../../lib/shared/'),
  ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
