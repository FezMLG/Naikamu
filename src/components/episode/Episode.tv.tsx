import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { IEpisode, LinkElement } from './interfaces';
import { darkStyle, darkColor } from '../../styles/darkMode.style';
import { mainEpisodeStyles } from './Episode';

import { Source } from './Source';
import { Text } from 'react-native-paper';
import { defaultRadius } from '../../styles/global.style';

export const EpisodeTV = ({
  num,
  navigation,
  episode,
}: {
  num: number;
  navigation: any;
  episode: IEpisode;
}) => (
  <View style={[styles.episodeContainer]}>
    <View style={[styles.card]}>
      <Image style={styles.poster} source={{ uri: episode.poster }} />
      <Text
        variant="titleLarge"
        accessible={false}
        numberOfLines={2}
        style={[styles.title, darkStyle.font]}>
        {num + ' ' + episode.title}
      </Text>
      <Text
        variant="bodyMedium"
        accessible={false}
        style={[styles.description, darkStyle.font]}>
        {episode.description}
      </Text>
    </View>
    <View style={styles.linksContainer}>
      <Text
        variant="titleSmall"
        accessible={false}
        style={[styles.title, darkStyle.font]}>
        Available players:
      </Text>
      <View style={styles.linksBox}>
        {episode.players.map((player: LinkElement, index: number) => {
          return (
            <Source
              key={index}
              navigation={navigation}
              player={player}
              title={episode.title}
            />
          );
        })}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  ...mainEpisodeStyles,
  card: {
    ...mainEpisodeStyles.card,
    borderBottomStartRadius: defaultRadius,
  },
  poster: {
    ...mainEpisodeStyles.poster,
    borderTopStartRadius: defaultRadius,
  },
  episodeContainer: {
    flex: 1,
    maxWidth: 700,
    maxHeight: 550,
    flexDirection: 'row',
    marginVertical: 10,
  },
  linksContainer: {
    width: '100%',
    height: '100%',
    maxWidth: 150,
    backgroundColor: darkColor.C800,
    borderTopRightRadius: defaultRadius,
    borderBottomRightRadius: defaultRadius,
  },
  linksBox: {
    flexDirection: 'column',
  },
});
