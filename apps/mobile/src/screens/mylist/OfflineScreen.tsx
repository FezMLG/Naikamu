import React, { useCallback, useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { OfflineSeries, useLayout } from '../../components';
import { OfflineWatchScreenProps } from '../../routes/main/mylist/offline/interface';
import { IOfflineSeries } from '../../services/offline/';
import { useOfflineService } from '../../services/offline/offline.service';

const OfflineScreen = ({}: OfflineWatchScreenProps) => {
  const { PageLayout, setInfo, setVisible } = useLayout();
  const [offlineSeries, setOfflineSeries] = useState<IOfflineSeries[]>([]);
  const { activeDownloads, getAllOfflineSeries, clearOffline } =
    useOfflineService();

  const handleLoadingOffline = useCallback(async () => {
    try {
      const offline = await getAllOfflineSeries();
      console.log('offline', offline);
      return offline;
    } catch (error) {
      console.log(error);
      setInfo(JSON.stringify(error));
      setVisible(true);
    }
  }, [getAllOfflineSeries, setInfo, setVisible]);

  useEffect(() => {
    (async () => {
      const offline = await handleLoadingOffline();
      if (offline) {
        setOfflineSeries(offline);
      }
    })();
  }, [handleLoadingOffline]);

  return (
    <PageLayout>
      {/* <Icon name={'pencil-outline'} size={36} color={'white'} /> */}
      {offlineSeries.map(series => (
        <OfflineSeries key={series.seriesId} series={series} />
      ))}
      <Text>{JSON.stringify(activeDownloads)}</Text>
      {activeDownloads.map(download => (
        <View>
          <Text>{download.series.seriesId}</Text>
          <Text>{download.series.title}</Text>
          <Text>{download.episode.length}</Text>
          <Text>{download.episode.title}</Text>
          <Text>{download.episode.length}</Text>
          <Text>{download.episode.translator}</Text>
          <Text>{download.progress}</Text>
        </View>
      ))}
      <Button
        title={'Clear'}
        onPress={() => {
          clearOffline();
        }}
      />
    </PageLayout>
  );
};

export default OfflineScreen;
