import React from 'react';

import { AnimePlayer } from '@aniwatch/shared';
import { useNavigation } from '@react-navigation/native';
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useQueryResolvePlayerLink } from '../../api/hooks';
import { useTranslate } from '../../i18n/useTranslate';
import { useUserSettingsService } from '../../services/settings/settings.service';
import { colors, DarkColor } from '../../styles';
import { ActivityIndicator } from '../atoms';

import { navigateToPlayer } from './navigateToPlayer';
import { PlayerMenu } from './PlayerMenu';

export function EpisodePlayer({
  seriesId,
  player,
  episodeNumber,
  episodeTitle,
  isDownloaded,
  handleDownload,
}: {
  seriesId: string;
  player: AnimePlayer;
  episodeNumber: number;
  episodeTitle: string;
  isDownloaded: boolean;
  handleDownload: (player: AnimePlayer, fileUrl: string) => void;
}) {
  const navigation = useNavigation<any>();

  const { userSettings } = useUserSettingsService();
  const { data, refetch, isLoading } = useQueryResolvePlayerLink({
    animeId: seriesId,
    player: player.player_name,
    url: player.player_link,
    resolution: userSettings.preferredResolution,
    translator: player.translator_name,
    episode: episodeNumber,
  });

  return (
    <View
      style={[
        styles.playersListItem,
        player.player_name.toLocaleLowerCase() === 'cda'
          ? { borderColor: colors.accent.color }
          : { height: 50 },
      ]}>
      <View style={styles.rowCenter}>
        {isLoading ? (
          <ActivityIndicator
            size="small"
            style={{ marginHorizontal: 10 }}
            visible={isLoading}
          />
        ) : (
          <>
            {data ? (
              <Pressable
                onPress={() => {
                  navigateToPlayer({
                    navigation,
                    episodeTitle,
                    seriesId,
                    response: data,
                    episodeNumber,
                  });
                }}>
                <Icon
                  name={data.type === 'local' ? 'play' : 'open-in-new'}
                  size={24}
                  style={[{ marginHorizontal: 10 }, colors.textLight]}
                />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => {
                  refetch();
                }}>
                <Icon
                  name="play"
                  size={24}
                  style={[{ marginHorizontal: 10 }, colors.textLight]}
                />
              </Pressable>
            )}
          </>
        )}
        <Text style={[colors.textLight]}>
          {player.translator_name +
            ' - ' +
            player.player_name.toLocaleLowerCase()}
        </Text>
      </View>
      <View style={styles.rowCenter}>
        <Image
          resizeMode="contain"
          source={require('../../../assets/logo_docchi.png')}
          style={[styles.logo, { maxWidth: 100 }]}
        />
        {player.player_name.toLocaleLowerCase() === 'cda' ? (
          <>
            {isDownloaded ? null : (
              <Icon
                name={
                  isDownloaded ? 'download-circle' : 'download-circle-outline'
                }
                onPress={() => {
                  refetch().then(({ data: resolvedLink }) => {
                    if (resolvedLink) {
                      handleDownload(player, resolvedLink.uri);
                    }
                  });
                }}
                size={24}
                style={[{ paddingHorizontal: 10 }, colors.textLight]}
              />
            )}
          </>
        ) : null}
        <PlayerMenu player={player} />
      </View>
    </View>
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
  },
  logo: {
    height: 20,
    opacity: 0.75,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
