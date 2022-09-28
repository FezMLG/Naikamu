import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import CardShadow from '../../../components/CardShadow';
import { darkColor, darkStyle } from '../../../styles/darkMode.style';
import { mainEpisodeStyles } from './Episode';
import { IEpisode, LinkElement } from './interfaces';
import { Source } from './Source';

export const EpisodeTV = ({
  num,
  navigation,
  episode,
}: {
  num: number;
  navigation: any;
  episode: IEpisode;
}) => (
  <CardShadow style={[styles.episodeContainer]} focus={false}>
    <View style={[styles.card, darkStyle.card]}>
      <Image style={styles.poster} source={{ uri: episode.poster }} />
      <Text
        accessible={false}
        numberOfLines={2}
        style={[styles.title, darkStyle.font]}>
        {num + ' ' + episode.title}
      </Text>
      <Text accessible={false} style={[styles.description, darkStyle.font]}>
        {episode.description}
      </Text>
    </View>
    <View style={styles.linksContainer}>
      <Text accessible={false} style={[styles.title, darkStyle.font]}>
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
  </CardShadow>
);

const styles = StyleSheet.create({
  ...mainEpisodeStyles,
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
  },
  linksBox: {
    flexDirection: 'column',
  },
});
