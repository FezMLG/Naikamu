import { MPDDownload } from '@naikamu/shared';
import { PermissionsAndroid, Platform } from 'react-native';
import RNFS from 'react-native-fs';

import { logger } from '../../utils';

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

function getFileExtensionAndRelativePath(
  fileUrl: string,
  seriesId: string,
  episodeNumber: number,
) {
  const fileExtension = fileUrl.split('.').pop();

  return relativeFilePath(seriesId, `${episodeNumber}.${fileExtension}`);
}

function getFileExtensionAndRelativePathForMPD(
  fileUrl: string,
  seriesId: string,
) {
  const fileName = fileUrl.split('/').pop();

  if (!fileName) {
    throw new Error('Invalid file URL provided');
  }

  return relativeFilePath(seriesId, fileName);
}

const startDownloadingFile = async (
  seriesId: string,
  episodeNumber: number,
  fileUrl: string,
  referer: string,
  beginDownload: (result: RNFS.DownloadBeginCallbackResult) => void,
  progressDownload: (result: RNFS.DownloadProgressCallbackResult) => void,
): Promise<[string, number, Promise<RNFS.DownloadResult>]> => {
  const hasPermissions = await checkPermissions();

  if (!hasPermissions) {
    throw new Error('No permissions to download file');
  }

  await createSeriesFolder(seriesId);
  const relativePathToFile = getFileExtensionAndRelativePath(
    fileUrl,
    seriesId,
    episodeNumber,
  );

  const job = RNFS.downloadFile({
    fromUrl: fileUrl,
    toFile: getAbsolutePath(relativePathToFile),
    begin: beginDownload,
    progress: progressDownload,
    progressInterval: 1000,
    background: true,
    headers: {
      Referer: referer,
    },
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

const startDownloadingMPDWithFiles = async (
  seriesId: string,
  files: MPDDownload,
  referer: string,
  beginDownload: (result: RNFS.DownloadBeginCallbackResult) => void,
  progressDownload: (result: RNFS.DownloadProgressCallbackResult) => void,
) => {
  const hasPermissions = await checkPermissions();

  if (!hasPermissions) {
    throw new Error('No permissions to download file');
  }

  if (!files.data.mpd || !files.data.video || !files.data.audio) {
    throw new Error('Invalid files data provided');
  }

  await createSeriesFolder(seriesId);

  const mpdFilePath = relativeFilePath(seriesId, `${seriesId}.mpd`);

  const videoFilePath = getFileExtensionAndRelativePathForMPD(
    files.data.video,
    seriesId,
  );

  const audioFilePath = getFileExtensionAndRelativePathForMPD(
    files.data.audio,
    seriesId,
  );

  logger('startDownloadingMPDWithFiles').info({
    data: {
      seriesId,
      mpdFilePath,
      videoFilePath,
      audioFilePath,
      referer,
    },
  });

  await RNFS.writeFile(
    getAbsolutePath(mpdFilePath),
    decodeURI(files.data.mpd),
    'utf8',
  );

  const videoJob = RNFS.downloadFile({
    fromUrl: files.data.video,
    toFile: getAbsolutePath(videoFilePath),
    begin: beginDownload,
    progress: progressDownload,
    progressInterval: 1000,
    background: true,
    headers: {
      Referer: referer,
    },
  });

  const audioJob = RNFS.downloadFile({
    fromUrl: files.data.audio,
    toFile: getAbsolutePath(audioFilePath),
    begin: beginDownload,
    progress: progressDownload,
    progressInterval: 1000,
    background: true,
    headers: {
      Referer: referer,
    },
  });

  return {
    audio: {
      relativePath: audioFilePath,
      jobId: audioJob.jobId,
      promise: audioJob.promise,
      finished: false,
    },
    video: {
      relativePath: videoFilePath,
      jobId: videoJob.jobId,
      promise: videoJob.promise,
      finished: false,
    },
    mpd: {
      relativePath: mpdFilePath,
    },
  };
};

export const offlineFS = {
  startDownloadingFile,
  startDownloadingMPDWithFiles,
  stopDownloadingFile,
  deleteFile,
  getAbsolutePath,
  checkPermissions,
};
