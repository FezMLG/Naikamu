import React from 'react';

import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';

import { useMutationUpdateUserSeriesWatchProgress } from '../../../api/hooks';
import { ActivityIndicator } from '../../atoms';

interface UpdateEpisodeWatchStatusProps {
  animeId: string;
  episode: number;
  isWatched: boolean;
}

export function UpdateEpisodeWatchStatus({
  animeId,
  episode,
  isWatched,
}: UpdateEpisodeWatchStatusProps) {
  const { watched, mutation } = useMutationUpdateUserSeriesWatchProgress(
    isWatched,
    animeId,
    episode,
  );

  return (
    <View style={styles.container}>
      {mutation.isLoading ? (
        <ActivityIndicator size="small" visible={mutation.isLoading} />
      ) : (
        <>
          {watched ? (
            <IconButton
              icon="check-circle"
              iconColor="#ffffff"
              onPress={() => {
                mutation.mutate();
              }}
              size={36}
            />
          ) : (
            <IconButton
              icon="check-circle-outline"
              iconColor="#ffffff"
              onPress={() => {
                mutation.mutate();
              }}
              size={36}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
