import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { darkStyle, darkColor } from '../../styles/darkMode.style';
import { mainEpisodeStyles } from './Episode';

import { Text } from 'react-native-paper';
import { defaultRadius } from '../../styles/global.style';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, RoutesNames } from '../../routes/interfaces';
import { AnimeEpisode } from '../../interfaces';

export const EpisodeTV = ({
  num,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
  episode,
}: {
  num: number;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    RoutesNames.Episodes,
    undefined
  >;
  episode: AnimeEpisode;
}) => (
  <View style={[styles.episodeContainer]}>
    <View style={[styles.card]}>
      <Image style={styles.poster} source={{ uri: episode.poster_url ?? '' }} />
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
        {/* {episode.players.map((player: LinkElement, index: number) => {
          return (
            <Source
              key={index}
              navigation={navigation}
              player={player}
              title={episode.title}
            />
          );
        })} */}
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
