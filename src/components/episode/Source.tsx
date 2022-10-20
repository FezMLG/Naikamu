import React from 'react';
import { StyleSheet } from 'react-native';

import { navigateToPlayer } from './Episode';
import { FocusButton } from '../FocusButton';
import { AnimePlayer } from '../../interfaces';

export const Source = ({
  navigation,
  player,
  animeTitle,
  episodeTitle,
}: {
  navigation: any;
  player: AnimePlayer;
  animeTitle: string;
  episodeTitle: string;
}) => {
  return (
    <FocusButton
      onPress={async () => {
        await navigateToPlayer({
          navigation: navigation,
          player: player,
          episodeTitle,
          animeTitle,
        });
      }}
      style={[styles.buttonLink]}>
      {player.translator_name + ' ' + player.player_name}
    </FocusButton>
  );
};

const styles = StyleSheet.create({
  buttonLink: {
    marginVertical: 5,
    width: '100%',
  },
});
