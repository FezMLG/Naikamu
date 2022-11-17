import React from 'react';
import { StyleSheet } from 'react-native';

import { navigateToPlayer } from './Episode';
import { TVButton } from '../TVButton';
import { AnimePlayer } from '@aniwatch/shared';

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
    <TVButton
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
    </TVButton>
  );
};

const styles = StyleSheet.create({
  buttonLink: {
    marginVertical: 5,
    width: '100%',
  },
});
