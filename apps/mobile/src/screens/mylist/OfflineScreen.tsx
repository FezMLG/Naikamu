import React, { useCallback, useEffect } from 'react';
import {
  ActiveDownload,
  OfflineSeries,
  PageLayout,
  useLayout,
} from '../../components';

import { ScrollView, Text } from 'react-native';
import { useDownloadsQueueStore } from '../../services/offline/queue.store';
import { logger } from '../../utils/logger';
import { useOfflineService } from '../../services';

const OfflineScreen = () => {
  const layout = useLayout();
  const {
    activeDownloads,
    queueDownloads,
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
      {/* <Icon name={'pencil-outline'} size={36} color={'white'} /> */}
      <ScrollView>
        {offlineSeries.length > 0 ? (
          // <Text>{JSON.stringify(offlineSeries)}</Text>
          offlineSeries
            .filter(series => series.episodes.length !== 0)
            .map(series => (
              <OfflineSeries key={series.seriesId} series={series} />
            ))
        ) : (
          <Text>No downloaded series</Text>
        )}
        {activeDownloads.map((download, index) => (
          <ActiveDownload
            key={index}
            download={download}
            stopAction={async () => {
              await stopDownload(download);
            }}
          />
        ))}
        {queueActions
          .getQueue()
          .slice(activeDownloads.length > 0 ? 1 : 0)
          .map((download, index) => {
            return (
              <ActiveDownload
                key={index}
                download={download}
                stopAction={() => {
                  queueActions.removeFromQueue(
                    download.series.seriesId,
                    download.episode.number,
                  );
                }}
              />
            );
          })}
      </ScrollView>
    </PageLayout.Default>
  );
};

export default OfflineScreen;
