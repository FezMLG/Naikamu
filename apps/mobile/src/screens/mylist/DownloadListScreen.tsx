import React, { useCallback, useEffect } from 'react';

import { ScrollView, Text } from 'react-native';

import {
  ActiveDownload,
  DownloadQueueGroup,
  OfflineSeries,
  PageLayout,
  sortDownloadQueueItems,
} from '../../components';
import { useTranslate } from '../../i18n/useTranslate';
import { useOfflineService } from '../../services';
import { useLayoutMessageService } from '../../services/layout-info';
import { useDownloadsQueueStore } from '../../services/offline/queue.store';
import { colors, fontStyles } from '../../styles';
import { logger } from '../../utils';

export function DownloadListScreen() {
  const { translate } = useTranslate();
  const { setAndShowMessage } = useLayoutMessageService();
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
      setAndShowMessage(JSON.stringify(error));
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
    <PageLayout.Default>
      <ScrollView>
        {offlineSeries.length > 0 ? (
          offlineSeries.map(series => (
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
        {sortDownloadQueueItems(queueActions.getQueue()).map(
          (queueItem, index) => (
            <DownloadQueueGroup
              action={queueActions.removeFromQueue}
              item={queueItem}
              key={index}
            />
          ),
        )}
      </ScrollView>
    </PageLayout.Default>
  );
}
