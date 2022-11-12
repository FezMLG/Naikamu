const path = require('path');

const extraNodeModules = {
  '@aniwatch/translations': path.resolve(
    __dirname + '/../../lib/translations/',
  ),
};
const watchFolders = [path.resolve(__dirname + '/../../lib/translations/')];

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    extraNodeModules,
  },
  watchFolders,
};
