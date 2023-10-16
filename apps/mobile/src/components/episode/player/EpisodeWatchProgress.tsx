import React, { useEffect } from 'react';

import { StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import {
  createEpisodeProgressKey,
  useActiveSeriesStore,
  useVideoProgress,
} from '../../../services';
import { colors } from '../../../styles';

export const EpisodeWatchProgress = ({
  episodeNumber,
}: {
  episodeNumber: number;
}) => {
  const series = useActiveSeriesStore(store => store.series)!;

  const { progress, loadProgress } = useVideoProgress(
    createEpisodeProgressKey(series.id, episodeNumber),
  );

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  return (
    <>
      {progress ? (
        <ProgressBar
          progress={progress / (24 * 60)}
          style={styles.progressBar}
          theme={{
            colors: {
              primary: colors.accent.color,
            },
          }}
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
