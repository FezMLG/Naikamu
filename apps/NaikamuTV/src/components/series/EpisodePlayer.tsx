import React from 'react';

import { AnimePlayer } from '@naikamu/shared';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useQueryResolvePlayerLink } from '../../api/hooks';
import { useTranslate } from '../../i18n/useTranslate';
import { useSelectedSeriesStore } from '../../services';
import { colors, DarkColor } from '../../styles';
import { ActivityIndicator, Selectable } from '../atoms';

export function EpisodePlayer({
  player,
  episodeNumber,
  episodeTitle,
}: {
  player: AnimePlayer;
  episodeNumber: number;
  episodeTitle: string;
}) {
  const series = useSelectedSeriesStore(store => store.series)!;

  const navigation = useNavigation<any>();

  const {
    isLoading,
    refetch: watchRefetch,
    isError,
  } = useQueryResolvePlayerLink({
    animeId: series.id,
    player: player.playerName,
    url: player.playerLink,
    resolution: '1080p',
    translator: player.translatorName,
    episode: episodeNumber,
  });

  return (
    <Selectable
      customStyles={[styles.playersListItem]}
      onPress={() =>
        watchRefetch().then(({ data: result }) => {
          // if (result) {
          //   navigation.navigate(RootStackScreenNames.NativePlayer, {
          //     uri: result.uri,
          //     seriesId: series.id,
          //     episodeTitle,
          //     episodeNumber,
          //   });
          // }
          console.log(result);
        })
      }>
      <View style={styles.rowCenter}>
        {isLoading ? (
          <ActivityIndicator size="large" style={{ marginHorizontal: 10 }} />
        ) : (
          <Icon name={isError ? 'alert-circle-outline' : 'play'} size={24} />
        )}
        <Text style={[colors.textLight]}>
          {player.translatorName +
            ' - ' +
            player.playerName.toLocaleLowerCase()}
        </Text>
      </View>
    </Selectable>
  );
}

export function EpisodePlayerEmpty() {
  const { translate } = useTranslate();

  return (
    <View style={[styles.playersListItem, { borderColor: colors.error.color }]}>
      <View style={styles.rowCenter}>
        <Icon
          name="cancel"
          size={24}
          style={[{ marginHorizontal: 10 }, colors.textLight]}
        />
        <Text style={[colors.textLight]}>
          {translate('anime_episodes.load_players_empty')}
        </Text>
      </View>
    </View>
  );
}

export function EpisodePlayerError() {
  const { translate } = useTranslate();

  return (
    <View style={[styles.playersListItem, { borderColor: colors.error.color }]}>
      <View style={styles.rowCenter}>
        <Icon
          name="alert-circle-outline"
          size={24}
          style={[{ marginHorizontal: 10 }, colors.textLight]}
        />
        <Text style={[colors.textLight]}>
          {translate('anime_episodes.load_players_error')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  playersListItem: {
    height: 70,
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: DarkColor.C800,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: DarkColor.C900,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  logo: {
    height: 20,
    opacity: 0.75,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});
