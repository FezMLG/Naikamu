import { PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs';

const folderNamingStrategy = (seriesId: string) => {
  return `${RNFS.ExternalStorageDirectoryPath}/Documents/AniWatch/downloads/${seriesId}`;
};

const fileNamingStrategy = (seriesId: string, fileName: string) => {
  return `${folderNamingStrategy(seriesId)}/${fileName}`;
};

// const getFile = async (seriesId: string, fileName: string) => {
//   return 'https://www.w3schools.com/html/mov_bbb.mp4';
// };

const downloadFile = async (
  seriesId: string,
  episodeNumber: number,
  fileUrl: string,
) => {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  );
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  );

  await RNFS.mkdir(folderNamingStrategy(seriesId));

  const fileExtension = fileUrl.split('.').pop();
  const pathToFile = fileNamingStrategy(
    seriesId,
    `${episodeNumber}.${fileExtension}`,
  );

  const job = RNFS.downloadFile({
    fromUrl: fileUrl,
    toFile: pathToFile,
  });

  await job.promise
    .then(() => {
      console.log(
        'successful video download! Save LOCAL_PATH_TO_VIDEO onto device for later use',
      );
    })
    .catch(err => {
      console.log(err);
    });

  return pathToFile;
};

const deleteEpisode = async (seriesId: string, fileName: string) => {
  const path = fileNamingStrategy(seriesId, fileName);
  await deleteFile(path);
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
  downloadFile,
};
