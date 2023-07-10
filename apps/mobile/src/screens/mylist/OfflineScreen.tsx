import React, { useCallback, useEffect } from 'react';
import { Text, View } from 'react-native';
import { OfflineSeries, useLayout } from '../../components';
import { OfflineWatchScreenProps } from '../../routes/main/mylist/offline/interface';
import { useOfflineService } from '../../services/offline/offline.service';
import { ProgressBar } from 'react-native-paper';
import { colors } from '../../styles';

const OfflineScreen = ({}: OfflineWatchScreenProps) => {
  const { PageLayout, setInfo, setVisible } = useLayout();
  const { activeDownloads, offlineSeries, getAllOfflineSeries, offlineStore } =
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
        offlineStore.setSeriesList(offline);
      }
    })();
  }, []);

  return (
    <PageLayout>
      {/* <Icon name={'pencil-outline'} size={36} color={'white'} /> */}
      {offlineSeries
        .filter(series => series.episodes.length !== 0)
        .map(series => (
          <OfflineSeries key={series.seriesId} series={series} />
        ))}
      {activeDownloads.map((download, index) => (
        <View key={index}>
          <Text>{download.series.seriesId}</Text>
          <Text>{download.series.title}</Text>
          <Text>
            {download.episode.number}. {download.episode.title}
          </Text>
          <Text>
            {download.episode.length} | {download.episode.translator}
          </Text>
          <ProgressBar
            animatedValue={download.progress}
            theme={{
              colors: {
                primary: colors.accent.color,
              },
            }}
          />
          <Text>{download.progress}</Text>
        </View>
      ))}
    </PageLayout>
  );
};

export default OfflineScreen;
