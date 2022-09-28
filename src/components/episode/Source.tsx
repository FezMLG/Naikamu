import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { LinkElement } from './interfaces';
import { RoutesNames } from '../../routes/RoutesNames.enum';

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
        navigation.navigate(RoutesNames.WatchNative, {
          uri: player.link,
          title: title,
          player: player.name,
        });
      }}>
      {player.name}
    </Button>
  );
};

const styles = StyleSheet.create({
  buttonLink: {
    minHeight: 50,
    borderColor: 'blue',
    borderWidth: 1,
    width: 100,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
