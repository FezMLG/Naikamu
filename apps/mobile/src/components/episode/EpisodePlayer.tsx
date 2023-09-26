import React, { useState } from 'react';

import { AnimePlayer } from '@aniwatch/shared';
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useQueryResolvePlayerLink } from '../../api/hooks';
import { useTranslate } from '../../i18n/useTranslate';
import { useUserSettingsService } from '../../services/settings/settings.service';
import { colors, DarkColor } from '../../styles';
import { ActivityIndicator } from '../atoms';

import { PlayerMenu } from './PlayerMenu';

export function EpisodePlayer({
  seriesId,
  player,
  episodeNumber,
  isDownloaded,
  handleDownload,
}: {
  seriesId: string;
  player: AnimePlayer;
  episodeNumber: number;
  isDownloaded: boolean;
  handleDownload: (player: AnimePlayer) => void;
}) {
  const [loading, setLoading] = useState(false);

  const { userSettings } = useUserSettingsService();
  const { refetch, isLoading } = useQueryResolvePlayerLink({
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
        {loading ? (
          <ActivityIndicator
            size="small"
            style={{ marginHorizontal: 10 }}
            visible={isLoading}
          />
        ) : (
          <Pressable
            onPress={() => {
              setLoading(true);
              refetch().then(() => setLoading(false));
            }}>
            <Icon
              name={
                player.player_name.toLocaleLowerCase() === 'cda'
                  ? 'play'
                  : 'open-in-new'
              }
              size={24}
              style={[{ marginHorizontal: 10 }, colors.textLight]}
            />
          </Pressable>
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
                onPress={() => handleDownload(player)}
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
