import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Button, Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { darkStyle, darkColor } from '../../styles/darkMode.style';
import { mainEpisodeStyles } from './Episode';
import { defaultRadius } from '../../styles/global.style';
import { RootStackParamList, RoutesNames } from '../../routes/interfaces';
import { AnimeEpisode, AnimePlayer } from '../../interfaces';
import { APIClient } from '../../api/APIClient';
import { Source } from './Source';
import { useTranslate } from '../../i18n/useTranslate';

export const EpisodeTV = ({
  num,
  navigation,
  episode,
  posterUrl,
  animeName,
}: {
  num: number;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    RoutesNames.Episodes,
    undefined
  >;
  episode: AnimeEpisode;
  posterUrl: string;
  animeName: string;
}) => {
  const apiClient = new APIClient();
  const { translate } = useTranslate();
  const { data, refetch } = useQuery(
    ['anime', 'episodes', num],
    () => apiClient.getEpisodePlayers(animeName, num),
    {
      enabled: false,
    },
  );

  return (
    <View style={[styles.episodeContainer]}>
      <View style={[styles.card]}>
        <Image
          style={styles.poster}
          source={{ uri: episode.poster_url ?? posterUrl }}
        />
        <Text
          variant="titleLarge"
          accessible={false}
          numberOfLines={2}
          style={[styles.title, darkStyle.font]}>
          {num + '. ' + episode.title}
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
          {translate('anime_episodes.available_players')}
        </Text>
        <View style={styles.linksBox}>
          <Button onPress={refetch}>
            {translate('anime_episodes.available_players')}
          </Button>
          {data &&
            data.players.map((player: AnimePlayer, index: number) => {
              return (
                <Source
                  key={index}
                  navigation={navigation}
                  player={player}
                  animeTitle={animeName}
                  episodeTitle={episode.title}
                />
              );
            })}
        </View>
      </View>
    </View>
  );
};

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
