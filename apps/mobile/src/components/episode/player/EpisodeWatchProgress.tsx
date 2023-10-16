import React, { useEffect } from 'react';

import { ProgressBar } from 'react-native-paper';

import {
  createEpisodeProgressKey,
  useActiveSeriesStore,
  useVideoProgress,
} from '../../../services';
import { colors } from '../../../styles';
import { logger } from '../../../utils/logger';
import { StyleSheet } from 'react-native';

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
    loadProgress().then(r => logger('EpisodeWatchProgress#useEffect').info(r));
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
