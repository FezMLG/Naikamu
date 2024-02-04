import React from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { SlideOutLeft } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { IDownloadsQueueItem } from '../../services/offline/queue.store';
import { colors, fontStyles, globalStyle } from '../../styles';

export type DownloadQueueItemProps = {
  item: IDownloadsQueueItem;
  action: (seriesId: string, episodeNumber: number) => void;
};

export const DownloadQueueItem = ({ item, action }: DownloadQueueItemProps) => (
  <Animated.View exiting={SlideOutLeft} style={globalStyle.spacerSmall}>
    <View style={styles.titleContainer}>
      <View>
        <Text
          style={[
            fontStyles.normal,
            colors.textLight,
            globalStyle.marginBottomSmall,
          ]}>
          {item.episode.number}.{' '}
          <Text style={[fontStyles.normal, colors.textLight]}>
            {item.episode.title}
          </Text>
        </Text>
        <Text style={[fontStyles.label, colors.textLighter]}>
          {item.episode.translator}
        </Text>
      </View>
      <Pressable
        onPress={() => action(item.series.seriesId, item.episode.number)}>
        <Icon color="white" name="stop" size={36} />
      </Pressable>
    </View>
  </Animated.View>
);

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
