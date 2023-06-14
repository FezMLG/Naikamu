import React, { useCallback, useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { ProgressiveImage, useLayout } from '../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, defaultRadius, fontStyles, globalStyle } from '../../styles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  OfflineWatchParamList,
  OfflineWatchScreenNames,
  OfflineWatchScreenProps,
} from '../../routes/main/mylist/offline/interface';
import { OfflineSeriesEpisodes, OfflineSeries } from '../../services/offline/';
import { useOfflineService } from '../../services/offline/offline.service';

const MyListSeries = ({
  animeId,
  title,
  size,
  quality,
  episodes,
}: {
  animeId: string;
  title: string;
  size: string;
  quality: string;
  episodes: OfflineSeriesEpisodes[];
}) => {
  const navigation = useNavigation<NavigationProp<OfflineWatchParamList>>();

  return (
    <Pressable
      style={[styles.seriesContainer, globalStyle.spacer]}
      onPress={() =>
        navigation.navigate(OfflineWatchScreenNames.OfflineEpisodes, {
          animeId,
          animeName: title,
          episodes,
        })
      }>
      <ProgressiveImage
        source={'https://i.imgur.com/2nCt3Sbl.jpg'}
        style={[styles.poster]}
      />
      <View style={[styles.details]}>
        <Text style={[styles.title, fontStyles.headerSmall, colors.textLight]}>
          {title}
        </Text>
        <Text style={[fontStyles.label]}>
          Episodes: {episodes.length} | {size} | {quality}
        </Text>
      </View>
      <Icon
        name={'chevron-left'}
        size={36}
        color={'white'}
        style={styles.chevronIcon}
      />
    </Pressable>
  );
};

const OfflineScreen = ({}: OfflineWatchScreenProps) => {
  const { PageLayout, setInfo, setVisible } = useLayout();
  const [offlineSeries, setOfflineSeries] = useState<OfflineSeries[]>([]);
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
        <MyListSeries
          key={series.seriesId}
          title={series.title}
          episodes={series.episodes}
          size={series.size}
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

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },
  seriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
    marginLeft: 10,
  },
  poster: {
    height: 115,
    width: 85,
    borderRadius: defaultRadius,
    resizeMode: 'cover',
  },
  chevronIcon: {
    transform: [{ rotate: '180deg' }],
  },
});

export default OfflineScreen;
