const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');
const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
  watchFolders: [
    path.resolve(__dirname + '/../../lib/translations/'),
    path.resolve(__dirname + '/../../lib/shared/'),
  ],
};

module.exports = mergeConfig(defaultConfig, config);
