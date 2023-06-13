const folderNamingStrategy = (seriesId: string, fileName: string) => {
  return `${seriesId}/${fileName}`;
};

const getFile = async (seriesId: string, fileName: string) => {
  return 'https://www.w3schools.com/html/mov_bbb.mp4';
};

const downloadFile = async (seriesId: string, fileName: string) => {};

export const offlineFS = {
  getFile,
  downloadFile,
};
