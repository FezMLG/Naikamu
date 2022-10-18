import React from 'react';
import { StyleSheet } from 'react-native';

import { LinkElement } from './interfaces';
import { navigateToPlayer } from './Episode';
import { FocusButton } from '../FocusButton';

export const Source = ({
  navigation,
  player,
  title,
}: {
  navigation: any;
  player: LinkElement;
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
      {player.name}
    </FocusButton>
  );
};

const styles = StyleSheet.create({
  buttonLink: {
    marginVertical: 5,
    width: '100%',
  },
});