import React from 'react';

import { AnimePlayer } from '@naikamu/shared';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Linking } from 'react-native';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useQueryResolvePlayerLink } from '../../../api/hooks';
import { useTranslate } from '../../../i18n/useTranslate';
import { RootStackScreenNames } from '../../../routes';
import {
  useActiveSeriesStore,
  useUserSettingsService,
} from '../../../services';
import { useLayoutMessageService } from '../../../services/layout-info';
import { colors, DarkColor } from '../../../styles';
import { ActivityIndicator, IconButton } from '../../atoms';

export function EpisodePlayer({
  player,
  episodeNumber,
  episodeTitle,
  isDownloaded,
  handleDownload,
  position,
}: {
  position: number;
  player: AnimePlayer;
  episodeNumber: number;
  episodeTitle: string;
  isDownloaded: boolean;
  handleDownload: (player: AnimePlayer, fileUrl: string) => void;
}) {
  const series = useActiveSeriesStore(store => store.series)!;
  const { setAndShowMessage } = useLayoutMessageService();

  const navigation = useNavigation<any>();

  const { userSettings } = useUserSettingsService();
  const {
    isLoading,
    refetch: watchRefetch,
    isError,
  } = useQueryResolvePlayerLink({
    animeId: series.id,
    player: player.playerName,
    url: player.playerLink,
    resolution: userSettings.preferredResolution,
    translator: player.translatorName,
    episode: episodeNumber,
  });

  const download = useQueryResolvePlayerLink({
    animeId: series.id,
    player: player.playerName,
    url: player.playerLink,
    resolution: userSettings.preferredDownloadQuality,
    translator: player.translatorName,
    episode: episodeNumber,
  });

  return (
    <Animated.View
      entering={SlideInLeft.delay(position * 25)}
      style={[
        styles.playersListItem,
        player.playerType === 'native'
          ? { borderColor: colors.accent.color }
          : {},
        player.playerType === 'external'
          ? { backgroundColor: colors.background.color, height: 50 }
          : {},
      ]}>
      <View style={styles.rowCenter}>
        {player.playerType === 'native' ? (
          <>
            {isLoading ? (
              <ActivityIndicator
                size="small"
                style={{ marginHorizontal: 10 }}
                visible={isLoading}
              />
            ) : (
              <IconButton
                icon={isError ? 'alert-circle-outline' : 'play'}
                onPress={() =>
                  watchRefetch().then(({ data: result }) => {
                    if (result && result.status === 200 && result.uri) {
                      navigation.navigate(RootStackScreenNames.NativePlayer, {
                        uri: result.uri,
                        seriesId: series.id,
                        episodeTitle: result.title || episodeTitle,
                        episodeNumber,
                        referer: player.playerLink,
                      });
                    } else {
                      setAndShowMessage('Failed to load player');
                    }
                  })
                }
              />
            )}
          </>
        ) : null}
        {player.playerType === 'embed' ? (
          <IconButton
            icon="play"
            onPress={() => {
              navigation.navigate(RootStackScreenNames.WebViewPlayer, {
                uri: player.playerLink,
                seriesId: series.id,
                episodeTitle,
                episodeNumber,
              });
            }}
          />
        ) : null}
        {player.playerType === 'external' ? (
          <IconButton
            icon="open-in-new"
            onPress={() => Linking.openURL(player.playerLink)}
          />
        ) : null}
        <Text
          numberOfLines={2}
          style={[
            colors.textLight,
            { width: player.downloadable ? '75%' : '80%' },
          ]}>
          {player.translatorName +
            ' - ' +
            player.playerName.toLocaleLowerCase()}
        </Text>
      </View>
      <View style={styles.rowCenter}>
        {player.downloadable ? (
          <>
            {isDownloaded ? (
              <Icon
                name="download-circle"
                size={24}
                style={[{ marginRight: 10 }, colors.textLight]}
              />
            ) : (
              <IconButton
                icon="download-circle-outline"
                onPress={() => {
                  download.refetch().then(({ data: resolvedLink }) => {
                    if (
                      resolvedLink &&
                      resolvedLink.status === 200 &&
                      resolvedLink.uri
                    ) {
                      if (resolvedLink.downloadable) {
                        handleDownload(player, resolvedLink.uri);
                      } else {
                        setAndShowMessage(
                          'File not yet available for download',
                        );
                      }
                    } else {
                      setAndShowMessage('Failed to fetch episode');
                    }
                  });
                }}
              />
            )}
          </>
        ) : null}
      </View>
    </Animated.View>
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
