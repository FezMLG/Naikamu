import { PermissionsAndroid, Platform } from 'react-native';
import RNFS from 'react-native-fs';

const relativeFolderPath = (folderName: string) => {
  switch (Platform.OS) {
    case 'android': {
      return `Naikamu/downloads/${folderName}`;
    }
    case 'ios': {
      return `downloads/${folderName}`;
    }
    default: {
      return `Naikamu/downloads/${folderName}`;
    }
  }
};

const relativeFilePath = (folderName: string, fileName: string) =>
  `${relativeFolderPath(folderName)}/${fileName}`;

const getAbsolutePath = (relativePath: string) =>
  `${RNFS.DocumentDirectoryPath}/${relativePath}`;

const grantPermissions = async () => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);
  }
};

const checkPermissions = async () => {
  if (Platform.OS === 'android') {
    if (Number(Platform.Version) >= 33) {
      return true;
    }

    const write = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    const read = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );

    if (!write || !read) {
      await grantPermissions();
    }

    return write && read;
  } else {
    return true;
  }
};

const createSeriesFolder = async (seriesId: string) => {
  await RNFS.mkdir(getAbsolutePath(relativeFolderPath(seriesId)));
};

const startDownloadingFile = async (
  seriesId: string,
  episodeNumber: number,
  fileUrl: string,
  beginDownload: (result: RNFS.DownloadBeginCallbackResult) => void,
  progressDownload: (result: RNFS.DownloadProgressCallbackResult) => void,
): Promise<[string, number, Promise<RNFS.DownloadResult>]> => {
  const hasPermissions = await checkPermissions();

  if (!hasPermissions) {
    throw new Error('No permissions to download file');
  }

  await createSeriesFolder(seriesId);

  const fileExtension = fileUrl.split('.').pop();
  const relativePathToFile = relativeFilePath(
    seriesId,
    `${episodeNumber}.${fileExtension}`,
  );

  const job = RNFS.downloadFile({
    fromUrl: fileUrl,
    toFile: getAbsolutePath(relativePathToFile),
    begin: beginDownload,
    progress: progressDownload,
    progressInterval: 1000,
    background: true,
  });

  return [relativePathToFile, job.jobId, job.promise];
};

const stopDownloadingFile = (jobId: number) => RNFS.stopDownload(jobId);

const deleteFile = async (relativePath: string) => {
  const path = getAbsolutePath(relativePath);

  await RNFS.unlink(path)
    .then(() => {
      console.log('FILE DELETED');
    })
    // `unlink` will throw an error, if the item to unlink does not exist
    .catch(error => {
      console.log(error.message);
    });
};

export const offlineFS = {
  startDownloadingFile,
  stopDownloadingFile,
  deleteFile,
  getAbsolutePath,
  checkPermissions,
};
