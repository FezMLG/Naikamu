import React from 'react';

import { StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { useActiveSeriesStore } from '../../../services';
import { colors } from '../../../styles';

export const EpisodeWatchProgress = ({
  episodeNumber,
}: {
  episodeNumber: number;
}) => {
  const episode = useActiveSeriesStore(store =>
    store.actions.getEpisode(episodeNumber),
  );

  return (
    <>
      {episode.progress ? (
        <ProgressBar
          progress={episode.progress / (24 * 60)}
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
