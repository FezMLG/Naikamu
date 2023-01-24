import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { APIClient } from '../../../api/APIClient';

interface AddToWatchListProps {
  animeId: string;
}

export const AddToWatchList = ({ animeId }: AddToWatchListProps) => {
  const apiClient = new APIClient();
  const mutation = useMutation({
    mutationFn: () => apiClient.addUserWatchListSeries(animeId),
  });

  return (
    <View>
      {mutation.isLoading ? (
        'Adding to watchlist...'
      ) : (
        <>
          {mutation.isError ? (
            <Text>{'An error occurred ' + mutation.error}</Text>
          ) : null}

          {mutation.isSuccess ? <Text>Added to watchlist</Text> : null}

          <Button
            onPress={() => {
              mutation.mutate();
            }}>
            Add to watchlist
          </Button>
        </>
      )}
    </View>
  );
};
