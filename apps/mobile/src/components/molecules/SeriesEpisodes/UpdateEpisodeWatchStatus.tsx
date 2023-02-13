import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import { APIClient } from '../../../api/APIClient';

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
  const [watched, setWatched] = useState<boolean>(isWatched);
  const apiClient = new APIClient();
  const mutation = useMutation({
    mutationFn: () => apiClient.updateUserSeriesWatchProgress(animeId, episode),
    onSuccess(data) {
      setWatched(data.isWatched);
    },
  });

  //TODO
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
