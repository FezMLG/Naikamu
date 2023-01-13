import React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, List, Text } from 'react-native-paper';
import { useQuery } from '@tanstack/react-query';

import { darkColor, darkStyle } from '../../styles/darkMode.style';
import { mainEpisodeStyles, navigateToPlayer } from './Episode';
import { defaultRadius } from '../../styles/global.style';
import { AnimeEpisode, AnimePlayer, AnimePlayers } from '@aniwatch/shared';
import { APIClient } from '../../api/APIClient';
import { PlayerMenu } from './PlayerMenu';
import { useTranslate } from '../../i18n/useTranslate';
import { SeriesScreenProps } from '../../routes/main';
import { useNavigation } from '@react-navigation/native';

export const EpisodeMobileLink = ({
  animeName,
  episodeTitle,
  players,
}: {
  animeName: string;
  episodeTitle: string;
  players: AnimePlayers;
}) => {
  const navigation = useNavigation<SeriesScreenProps>();

  return (
    <>
      {players.players.map((player: AnimePlayer, index: number) => {
        // TODO on long press user can choose if he want to open in webview or open external browser (mobile only)
        return (
          <List.Item
            key={index}
            title={player.translator_name + ' ' + player.player_name}
            onPress={async () => {
              await navigateToPlayer({
                navigation: navigation,
                player: player,
                episodeTitle: episodeTitle,
                animeTitle: animeName,
              });
            }}
            right={() => <PlayerMenu player={player} />}
          />
        );
      })}
    </>
  );
};

export const EpisodeMobile = ({
  num,
  episode,
  posterUrl,
  id,
  animeName,
}: {
  num: number;
  episode: AnimeEpisode;
  posterUrl: string;
  id: string;
  animeName: string;
}) => {
  const apiClient = new APIClient();
  const { translate } = useTranslate();
  const { data, refetch } = useQuery(
    ['anime', 'episodes', num],
    () => apiClient.getEpisodePlayers(id, num),
    {
      enabled: false,
    },
  );

  return (
    <SafeAreaView style={[styles.episodeContainerMobile]}>
      <View style={[styles.card, darkStyle.card]}>
        <Image
          style={[styles.poster, styles.borderRadius]}
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
        <List.Accordion
          title={translate('anime_episodes.available_players')}
          left={props => <List.Icon {...props} icon="folder" />}
          onPress={refetch}
          style={styles.playersList}>
          {data ? (
            <EpisodeMobileLink
              animeName={animeName}
              players={data}
              episodeTitle={episode.title}
            />
          ) : (
            <ActivityIndicator size="large" />
          )}
        </List.Accordion>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ...mainEpisodeStyles,
  episodeContainerMobile: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    marginVertical: 10,
  },
  description: {
    width: '100%',
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  borderRadius: {
    borderTopRightRadius: defaultRadius,
    borderTopLeftRadius: defaultRadius,
  },
  playersList: {
    backgroundColor: darkColor.C900,
    borderBottomRightRadius: defaultRadius,
    borderBottomLeftRadius: defaultRadius,
  },
});
