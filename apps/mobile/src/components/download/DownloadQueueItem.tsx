import React from 'react';

import { Divider } from '@gluestack-ui/themed';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { SlideOutLeft } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors, fontStyles, globalStyle } from '../../styles';

import { SortedDownloadQueueItem } from './sortDownloadQueueItems';

export type DownloadQueueItemProps = {
  item: SortedDownloadQueueItem;
};

export const DownloadQueueItem = ({ item }: DownloadQueueItemProps) => (
  <View>
    <Text
      style={[fontStyles.headerSmall, colors.textLight, globalStyle.marginTop]}>
      {item.series.title}
    </Text>
    <Divider bg={colors.grey.color} />
    {item.episodes.map((episode, episodeIndex) => (
      <Animated.View
        exiting={SlideOutLeft}
        key={episodeIndex}
        style={globalStyle.spacerSmall}>
        <View style={styles.titleContainer}>
          <View>
            <Text
              style={[
                fontStyles.normal,
                colors.textLight,
                globalStyle.marginBottomSmall,
              ]}>
              {episode.episode.number}.{' '}
              <Text style={[fontStyles.normal, colors.textLight]}>
                {episode.episode.title}
              </Text>
            </Text>
            <Text style={[fontStyles.label, colors.textLighter]}>
              {episode.episode.translator}
            </Text>
          </View>
          <Pressable onPress={() => {}}>
            <Icon color="white" name="stop" size={36} />
          </Pressable>
        </View>
      </Animated.View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
