import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Pressable, View, Text, StyleSheet } from 'react-native';

import {
  OfflineWatchParamList,
  OfflineWatchScreenNames,
} from '../../routes/main/mylist/offline/interface';
import { IOfflineSeriesEpisodes } from '../../services';
import { globalStyle, fontStyles, colors, defaultRadius } from '../../styles';
import { ProgressiveImage } from '../ProgressiveImage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const OfflineSeries = ({
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
  episodes: IOfflineSeriesEpisodes[];
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
