import React, { useState } from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, List, ProgressBar } from 'react-native-paper';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AnimeEpisode, AnimePlayer } from '@aniwatch/shared';

import { darkColor, darkStyle } from '../../styles/darkMode.style';
import { colors, defaultRadius, fontStyles } from '../../styles/global.style';
import { useTranslate } from '../../i18n/useTranslate';
import { UpdateEpisodeWatchStatus } from '../molecules';
import { useQuerySeriesEpisodePlayers } from '../../api/hooks';
import { maxWidth } from '../maxDimensions';
import { EpisodePlayer } from './EpisodePlayer';
import { useOfflineService } from '../../services/offline/offline.service';
import { useVideoProgress, createEpisodeProgressKey } from '../../services';

export const Episode = ({
  num,
  episode,
  posterUrl,
  id,
  animeName,
  isWatched,
  episodeLength,
}: {
  num: number;
  episode: AnimeEpisode;
  posterUrl: string;
  id: string;
  animeName: string;
  isWatched: boolean;
  episodeLength: number;
}) => {
  const [isDownloaded, setIsDownloaded] = useState(false);

  const { translate } = useTranslate();
  const { data, refetch } = useQuerySeriesEpisodePlayers(id, num);
  const [isSelected, setIsSelected] = useState(false);
  const { addOfflineSeries, saveEpisodeOffline } = useOfflineService();
  const { progress, loadProgress } = useVideoProgress(
    createEpisodeProgressKey(id, num),
  );

  const openDetails = () => {
    setIsSelected(prev => !prev);
  };
  loadProgress();

  const handleDownload = async (player: AnimePlayer) => {
    const episodeToAdd = {
      number: episode.number,
      title: episode.title,
      length: episodeLength,
      translator: player.translator_name,
      pathToFile: null,
    };
    await addOfflineSeries({
      seriesId: id,
      title: animeName,
      size: '',
      quality: '1080p',
      episodes: [],
    });
    await saveEpisodeOffline(id, episodeToAdd, player.player_link);
    setIsDownloaded(prev => !prev);
  };

  return (
    <SafeAreaView style={[styles.episodeContainer]}>
      <View
        style={[
          styles.cardContainer,
          isSelected && darkStyle.card,
          !progress
            ? {
                borderBottomLeftRadius: defaultRadius,
                borderBottomRightRadius: defaultRadius,
              }
            : null,
        ]}>
        <Pressable style={[styles.innerCard]} onPress={openDetails}>
          <Image
            style={[
              styles.poster,
              (!isSelected && episode.description) || progress
                ? null
                : {
                    borderBottomLeftRadius: defaultRadius,
                  },
            ]}
            source={{ uri: episode.poster_url ?? posterUrl }}
          />
          <View style={styles.titleRow}>
            <Text numberOfLines={2} style={[styles.title, colors.textLight]}>
              {num + '. ' + episode.title}
            </Text>
            <Text
              numberOfLines={2}
              style={[fontStyles.label, colors.textLight]}>
              {episodeLength} min
            </Text>
          </View>
          <View style={styles.watchStatus}>
            <UpdateEpisodeWatchStatus
              animeId={id}
              isWatched={isWatched}
              episode={episode.number}
            />
            <Icon
              name={isSelected ? 'chevron-up' : 'chevron-down'}
              size={30}
              color={colors.textLight.color}
            />
          </View>
        </Pressable>
        {progress ? (
          <ProgressBar
            progress={progress / (24 * 60)}
            style={{ zIndex: 1 }}
            theme={{
              colors: {
                primary: colors.accent.color,
              },
            }}
          />
        ) : null}
        {isSelected ? (
          <>
            {episode.description ? (
              <Text
                style={[styles.description, darkStyle.font, fontStyles.text]}>
                {episode.description}
              </Text>
            ) : null}
          </>
        ) : null}
      </View>
      {isSelected ? (
        <View style={styles.playersListContainer}>
          <List.Accordion
            title={translate('anime_episodes.available_players')}
            left={props => <List.Icon {...props} icon="folder" />}
            onPress={() => refetch()}
            theme={{
              colors: {
                primary: colors.accent.color,
                secondary: colors.textDark.color,
              },
            }}
            style={styles.playersList}>
            {data ? (
              data.players.map((player: AnimePlayer, index: number) => {
                return (
                  <EpisodePlayer
                    key={index}
                    seriesId={id}
                    player={player}
                    episodeTitle={'E' + episode.number + ' ' + episode.title}
                    episodeNumber={episode.number}
                    isDownloaded={isDownloaded}
                    handleDownload={handleDownload}
                  />
                );
              })
            ) : (
              <ActivityIndicator size="large" style={styles.playersLoading} />
            )}
          </List.Accordion>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  episodeContainer: {
    marginVertical: 16,
    width: '100%',
  },
  poster: {
    width: 110,
    height: 80,
    borderTopLeftRadius: defaultRadius,
  },
  titleRow: {
    width: maxWidth() - 110 - 45 - 22,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'column',
  },
  watchStatus: {
    width: 45,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
    fontSize: 16,
  },
  innerCard: {
    width: '100%',
    flexDirection: 'row',
  },
  cardContainer: {
    borderTopLeftRadius: defaultRadius,
    borderTopRightRadius: defaultRadius,
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: darkColor.C800,
  },
  linksContainer: {
    width: '100%',
    height: '100%',
    maxWidth: 150,
    backgroundColor: darkColor.C800,
  },
  description: {
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  playersList: {
    marginTop: 10,
    backgroundColor: darkColor.C900,
    borderRadius: defaultRadius,
  },
  playersListItem: {
    height: 70,
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: darkColor.C700,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playersListContainer: {
    backgroundColor: darkColor.C800,
    borderRadius: defaultRadius,
    maxWidth: '100%',
  },
  playersLoading: {
    height: 70,
    width: '85%',
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
