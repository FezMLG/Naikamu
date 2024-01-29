import { IOfflineSeries } from '../../services';
import { IDownloadsQueueItem } from '../../services/offline/queue.store';

export type SortedDownloadQueueItem = {
  series: IOfflineSeries;
  episodes: IDownloadsQueueItem[];
};

export const sortDownloadQueueItems = (array: IDownloadsQueueItem[]) => {
  const mapped: SortedDownloadQueueItem[] = [];

  for (const downloadElement of array) {
    const fromMapIndex = mapped.findIndex(
      element => element.series.seriesId === downloadElement.series.seriesId,
    );

    if (fromMapIndex >= 0) {
      mapped[fromMapIndex].episodes.push(downloadElement);
      mapped[fromMapIndex].series = downloadElement.series;
    } else {
      mapped.push({
        series: downloadElement.series,
        episodes: [downloadElement],
      });
    }
  }

  return mapped;
};
