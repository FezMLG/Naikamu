import { PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs';

const folderNamingStrategy = (seriesId: string) => {
  return `${RNFS.ExternalStorageDirectoryPath}/Documents/AniWatch/downloads/${seriesId}`;
};

const fileNamingStrategy = (seriesId: string, fileName: string) => {
  return `${folderNamingStrategy(seriesId)}/${fileName}`;
};

const grantPermissions = async () => {
  await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  ]);
};

const checkPermissions = async () => {
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
};

const startDownloadingFile = async (
  seriesId: string,
  episodeNumber: number,
  fileUrl: string,
  beginDownload: (res: RNFS.DownloadBeginCallbackResult) => void,
  progressDownload: (res: RNFS.DownloadProgressCallbackResult) => void,
): Promise<[string, number, Promise<RNFS.DownloadResult>]> => {
  const hasPermissions = await checkPermissions();
  if (!hasPermissions) {
    throw new Error('No permissions to download file');
  }

  await RNFS.mkdir(folderNamingStrategy(seriesId));

  const fileExtension = fileUrl.split('.').pop();
  const pathToFile = fileNamingStrategy(
    seriesId,
    `${episodeNumber}.${fileExtension}`,
  );

  const job = RNFS.downloadFile({
    fromUrl: fileUrl,
    toFile: pathToFile,
    begin: beginDownload,
    progress: progressDownload,
    progressInterval: 1000,
  });

  return [pathToFile, job.jobId, job.promise];
};

const deleteFile = async (path: string) => {
  await RNFS.unlink(path)
    .then(() => {
      console.log('FILE DELETED');
    })
    // `unlink` will throw an error, if the item to unlink does not exist
    .catch(err => {
      console.log(err.message);
    });
};

export const offlineFS = {
  startDownloadingFile,
  deleteFile,
};
