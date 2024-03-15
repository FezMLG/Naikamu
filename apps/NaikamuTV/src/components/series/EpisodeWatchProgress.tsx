import React from 'react';

import { StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

import { useSelectedSeriesStore } from '../../services';
import { colors } from '../../styles';

export const EpisodeWatchProgress = ({
  episodeNumber,
  width,
}: {
  episodeNumber: number;
  width: number;
}) => {
  const series = useSelectedSeriesStore(store => store.details)!;

  const episode = useSelectedSeriesStore(store =>
    store.actions.getEpisode(episodeNumber),
  );

  return (
    <>
      {episode.progress ? (
        <Progress.Bar
          borderColor="transparent"
          color={colors.accent.color}
          progress={episode.progress / ((series.duration ?? 24) * 60)}
          style={styles.progressBar}
          width={width}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    zIndex: 1,
  },
});
