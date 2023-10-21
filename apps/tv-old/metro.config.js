/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const watchFolders = [
  path.resolve(__dirname + '/../../lib/translations/'),
  path.resolve(__dirname + '/../../lib/shared/'),
];

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  watchFolders,
};
