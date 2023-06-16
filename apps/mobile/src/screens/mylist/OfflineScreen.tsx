import React, { useCallback, useEffect, useState } from 'react';
import { Button, Text } from 'react-native';
import { OfflineSeries, useLayout } from '../../components';
import { OfflineWatchScreenProps } from '../../routes/main/mylist/offline/interface';
import { IOfflineSeries } from '../../services/offline/';
import { useOfflineService } from '../../services/offline/offline.service';

const OfflineScreen = ({}: OfflineWatchScreenProps) => {
  const { PageLayout, setInfo, setVisible } = useLayout();
  const [offlineSeries, setOfflineSeries] = useState<IOfflineSeries[]>([]);
  const { getActiveDownloads, getAllOfflineSeries, clearOffline } =
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
        <OfflineSeries
          key={series.seriesId}
          title={series.title}
          episodes={series.episodes}
          quality={series.quality}
          animeId={series.seriesId}
        />
      ))}
      <Text>{JSON.stringify(getActiveDownloads())}</Text>
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
