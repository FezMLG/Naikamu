const { getSentryExpoConfig } = require('@sentry/react-native/metro');
const { mergeConfig } = require('@react-native/metro-config');

const path = require('path');

const defaultConfig = getSentryExpoConfig(__dirname);
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
    resolveRequest: (context, moduleName, platform) => {
      // Prevent Metro from resolving 'react' to '@types/react'
      if (moduleName === 'react') {
        return {
          type: 'sourceFile',
          filePath: path.resolve(__dirname, 'node_modules/react/index.js'),
        };
      }
      // Fall back to default resolution
      return context.resolveRequest(context, moduleName, platform);
    },
  },
  watchFolders: [
    path.resolve(__dirname + '/../../lib/translations/'),
    path.resolve(__dirname + '/../../lib/shared/'),
  ],
};

module.exports = mergeConfig(defaultConfig, config);
