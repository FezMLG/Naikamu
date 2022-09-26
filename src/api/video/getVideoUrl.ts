import { getCDAVideoUrl } from './getCDAVideoUrl';

export const getVideoUrl = async (source: string, ebdUri: string) => {
  const localSource = source
    .replace(/[\u0250-\ue007]/g, '')
    .replace(/\s/g, '')
    .toLowerCase();

  switch (localSource) {
    case 'cda':
      return getCDAVideoUrl(ebdUri);

    default:
      throw new Error('This source is not yet implemented');
  }
};
