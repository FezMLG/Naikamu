import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, IconButton } from 'react-native-paper';

import { useMutationUpdateUserSeriesWatchProgress } from '../../../api/hooks';

interface UpdateEpisodeWatchStatusProps {
  animeId: string;
  episode: number;
  isWatched: boolean;
}

export const UpdateEpisodeWatchStatus = ({
  animeId,
  episode,
  isWatched,
}: UpdateEpisodeWatchStatusProps) => {
  const { watched, mutation } = useMutationUpdateUserSeriesWatchProgress(
    isWatched,
    animeId,
    episode,
  );

  return (
    <View style={styles.container}>
      {mutation.isLoading ? (
        <ActivityIndicator size={'small'} />
      ) : (
        <>
          {watched ? (
            <IconButton
              icon={'check-circle'}
              iconColor={'#ffffff'}
              onPress={() => {
                mutation.mutate();
              }}
            />
          ) : (
            <IconButton
              icon={'check-circle-outline'}
              iconColor={'#ffffff'}
              onPress={() => {
                mutation.mutate();
              }}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
