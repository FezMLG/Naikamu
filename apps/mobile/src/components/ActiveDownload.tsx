import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { IEpisodeDownloadJob } from '../services/offline/downloads.store';
import { fontStyles, colors, globalStyle } from '../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { SlideOutLeft } from 'react-native-reanimated';
import Config from 'react-native-config';

export const ActiveDownload = ({
  download,
  stopAction,
}: {
  download: Omit<IEpisodeDownloadJob, 'jobId'>;
  stopAction: (event: GestureResponderEvent) => void;
}) => {
  return (
    <Animated.View exiting={SlideOutLeft} style={globalStyle.spacer}>
      {Config.ENV === 'development' ? (
        <Text style={[fontStyles.label, colors.textLight]}>
          {download.series.seriesId}
        </Text>
      ) : null}
      <Text
        style={[
          fontStyles.label,
          colors.textLighter,
          globalStyle.marginBottomSmall,
        ]}>
        {download.series.title}
      </Text>
      <View style={styles.titleContainer}>
        <View>
          <Text
            style={[
              fontStyles.headerSmall,
              colors.textLight,
              globalStyle.marginBottomSmall,
            ]}>
            {download.episode.number}. {download.episode.title}
          </Text>
          <Text
            style={[
              fontStyles.text,
              colors.textLight,
              globalStyle.marginBottomSmall,
            ]}>
            {download.episode.translator}
          </Text>
        </View>
        <Pressable onPress={stopAction}>
          <Icon name={'stop'} size={36} color={'white'} />
        </Pressable>
      </View>
      <ProgressBar
        animatedValue={download.progress}
        theme={{
          colors: {
            primary: colors.accent.color,
          },
        }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
