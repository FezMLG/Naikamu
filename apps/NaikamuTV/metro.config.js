const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const {
  createSentryMetroSerializer,
} = require('@sentry/react-native/dist/js/tools/sentryMetroSerializer');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
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
  serializer: {
    customSerializer: createSentryMetroSerializer(),
  },
};

module.exports = mergeConfig(defaultConfig, config);
