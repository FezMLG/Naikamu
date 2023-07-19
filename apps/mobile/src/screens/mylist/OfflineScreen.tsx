import React, { useCallback, useEffect } from 'react';
import {
  ActiveDownload,
  OfflineSeries,
  PageLayout,
  useLayout,
} from '../../components';
import { OfflineWatchScreenProps } from '../../routes/main/mylist/offline/interface';
import { useOfflineService } from '../../services/offline/offline.service';
import { ScrollView } from 'react-native';

const OfflineScreen = ({}: OfflineWatchScreenProps) => {
  const layout = useLayout();
  const { activeDownloads, offlineSeries, getAllOfflineSeries, offlineStore } =
    useOfflineService();

  const handleLoadingOffline = useCallback(async () => {
    try {
      const offline = await getAllOfflineSeries();
      console.log('offline', offline);
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
        {offlineSeries
          .filter(series => series.episodes.length !== 0)
          .map(series => (
            <OfflineSeries key={series.seriesId} series={series} />
          ))}
        {activeDownloads.map((download, index) => (
          <ActiveDownload key={index} download={download} />
        ))}
      </ScrollView>
    </PageLayout.Default>
  );
};

export default OfflineScreen;
