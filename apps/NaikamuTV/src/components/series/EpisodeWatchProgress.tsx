import React, { useEffect } from 'react';

import { StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

import {
  createEpisodeProgressKey,
  useSelectedSeriesStore,
  useVideoProgress,
} from '../../services';
import { colors } from '../../styles';

export const EpisodeWatchProgress = ({
  episodeNumber,
  width,
}: {
  episodeNumber: number;
  width: number;
}) => {
  const series = useSelectedSeriesStore(store => store.details)!;

  const { progress, loadProgress } = useVideoProgress(
    createEpisodeProgressKey(series.id, episodeNumber),
  );

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  return (
    <>
      {progress ? (
        <Progress.Bar
          borderColor="transparent"
          color={colors.accent.color}
          progress={progress / ((series.duration ?? 24) * 60)}
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
