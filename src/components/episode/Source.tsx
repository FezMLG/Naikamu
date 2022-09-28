import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { LinkElement } from './interfaces';
import { navigateToPlayer } from './Episode';

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
    <Button
      style={styles.buttonLink}
      onPress={() => {
        navigateToPlayer({
          navigation: navigation,
          player: player,
          title: title,
        });
      }}>
      {player.name}
    </Button>
  );
};

const styles = StyleSheet.create({
  buttonLink: {
    minHeight: 50,
    width: 100,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
