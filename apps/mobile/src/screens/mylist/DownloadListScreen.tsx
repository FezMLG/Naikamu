import React, { useCallback, useEffect } from 'react';

import { ScrollView, Text } from 'react-native';

import {
  ActiveDownload,
  DownloadQueueGroup,
  OfflineSeries,
  PageLayout,
  sortDownloadQueueItems,
  useLayout,
} from '../../components';
import { useTranslate } from '../../i18n/useTranslate';
import { useOfflineService } from '../../services';
import { useDownloadsQueueStore } from '../../services/offline/queue.store';
import { colors, fontStyles } from '../../styles';
import { logger } from '../../utils/logger';

export function DownloadListScreen() {
  const { translate } = useTranslate();
  const layout = useLayout();
  const {
    activeDownloads,
    offlineSeries,
    getAllOfflineSeries,
    offlineStore,
    stopDownload,
  } = useOfflineService();

  const queueActions = useDownloadsQueueStore(state => state.actions);

  const handleLoadingOffline = useCallback(async () => {
    try {
      const offline = await getAllOfflineSeries();

      logger('handleLoadingOffline').info(offline);

      return offline;
    } catch (error) {
      console.log(error);
      layout.setInfo(JSON.stringify(error));
      layout.setVisible(true);
    }
  }, [getAllOfflineSeries]);

  useEffect(() => {
    (async () => {
      const offline = await handleLoadingOffline();

      if (offline) {
        offlineStore.setSeriesList(offline);
      }
    })();
  }, []);

  return (
    <PageLayout.Default {...layout}>
      <ScrollView>
        {offlineSeries.length > 0 ? (
          offlineSeries
            .filter(series => series.episodes.length > 0)
            .map(series => (
              <OfflineSeries key={series.seriesId} series={series} />
            ))
        ) : (
          <Text style={[colors.textLight, fontStyles.paragraph]}>
            {translate('myList.download.notFound')}
          </Text>
        )}
        {activeDownloads.map((download, index) => (
          <ActiveDownload
            download={download}
            key={index}
            stopAction={async () => {
              await stopDownload(download);
            }}
          />
        ))}
        {sortDownloadQueueItems(queueActions.getQueue())
          .slice(activeDownloads.length > 0 ? 1 : 0)
          .map((queueItem, index) => (
            <DownloadQueueGroup
              action={queueActions.removeFromQueue}
              item={queueItem}
              key={index}
            />
          ))}
      </ScrollView>
    </PageLayout.Default>
  );
}
