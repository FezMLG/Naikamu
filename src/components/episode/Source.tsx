import React from 'react';
import { StyleSheet } from 'react-native';

import { navigateToPlayer } from './Episode';
import { FocusButton } from '../FocusButton';
import { AnimePlayer } from '../../interfaces';

export const Source = ({
  navigation,
  player,
  title,
}: {
  navigation: any;
  player: AnimePlayer;
  title: string;
}) => {
  return (
    <FocusButton
      onPress={async () => {
        await navigateToPlayer({
          navigation: navigation,
          player: player,
          title: title,
        });
      }}
      style={[styles.buttonLink]}>
      {player.player_name}
    </FocusButton>
  );
};

const styles = StyleSheet.create({
  buttonLink: {
    marginVertical: 5,
    width: '100%',
  },
});
