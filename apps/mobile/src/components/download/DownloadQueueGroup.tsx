import React from 'react';

import { Divider } from '@gluestack-ui/themed';
import { Text, View } from 'react-native';

import { colors, fontStyles, globalStyle } from '../../styles';

import { DownloadQueueItem } from './DownloadQueueItem';
import { SortedDownloadQueueItem } from './sortDownloadQueueItems';

export type DownloadQueueGroupProps = {
  item: SortedDownloadQueueItem;
  action: (seriesId: string, episodeNumber: number) => void;
};

export const DownloadQueueGroup = ({
  item,
  action,
}: DownloadQueueGroupProps) => (
  <View>
    <Text
      style={[fontStyles.headerSmall, colors.textLight, globalStyle.marginTop]}>
      {item.series.title}
    </Text>
    <Divider bg={colors.grey.color} />
    {item.episodes.map((episode, index) => (
      <DownloadQueueItem action={action} item={episode} key={index} />
    ))}
  </View>
);
