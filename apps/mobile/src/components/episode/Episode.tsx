import React, { useState } from 'react';

import { AnimeEpisode, AnimePlayer } from '@naikamu/shared';
import { BlurView } from '@react-native-community/blur';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useQuerySeriesEpisodePlayers } from '../../api/hooks';
import {
  createEpisodeProgressKey,
  useOfflineService,
  useVideoProgress,
  useUserSettingsService,
  useActiveSeriesStore,
} from '../../services';
import {
  colors,
  DarkColor,
  darkStyle,
  defaultRadius,
  fontStyles,
} from '../../styles';
import { logger } from '../../utils/logger';
import { ActivityIndicator } from '../atoms';
import { UpdateEpisodeWatchStatus } from '../molecules';
import { PlatformExplicit } from '../PlatformExplicit';
import { ProgressiveImage } from '../ProgressiveImage';

import {
  EpisodePlayer,
  EpisodePlayerEmpty,
  EpisodePlayerError,
} from './EpisodePlayer';

export function Episode({
  episode,
  isWatched,
}: {
  episode: AnimeEpisode;
  isWatched: boolean;
}) {
  const series = useActiveSeriesStore(store => store.series)!;

  const { data, refetch, isLoading, isError } = useQuerySeriesEpisodePlayers(
    series.id,
    episode.number,
  );
  const [isSelected, setIsSelected] = useState(false);
  const { addOfflineSeries, addToQueue } = useOfflineService();
  const { progress, loadProgress } = useVideoProgress(
    createEpisodeProgressKey(series.id, episode.number),
  );
  const {
    userSettings: { preferredDownloadQuality },
  } = useUserSettingsService();
  const { checkIfEpisodeIsDownloaded } = useOfflineService();

  const [isDownloaded, setIsDownloaded] = useState(false);

  const openDetails = () => {
    setIsSelected(previous => !previous);
    checkIfEpisodeIsDownloaded(series.id, episode.number).then(response => {
      logger('openDetails#checkIfEpisodeIsDownloaded').info(
        series.id,
        episode.number,
        response,
      );
      setIsDownloaded(() => response);
    });
    refetch();
  };

  loadProgress();

  const handleDownload = async (player: AnimePlayer, fileUrl: string) => {
    const episodeToAdd = {
      number: episode.number,
      title: episode.title,
      length: series.episodeLength,
      translator: player.translatorName,
      pathToFile: null,
      size: 0,
    };

    await addOfflineSeries({
      seriesId: series.id,
      title: series.title,
      quality: preferredDownloadQuality,
      episodes: [],
    });
    await addToQueue({
      seriesId: series.id,
      episode: episodeToAdd,
      fileUrl,
    });
    setIsDownloaded(previous => !previous);
  };

  return (
    <SafeAreaView style={[styles.episodeContainer]}>
      <View
        style={[
          styles.cardContainer,
          isSelected && darkStyle.card,
          progress
            ? null
            : {
                borderBottomLeftRadius: defaultRadius,
                borderBottomRightRadius: defaultRadius,
              },
        ]}>
        <PlatformExplicit availablePlatforms={['ios']}>
          <ProgressiveImage
            key="blurryImage"
            source={episode.poster_url ?? series.posterUrl}
            style={[
              StyleSheet.absoluteFill,
              {
                borderRadius: defaultRadius - 1,
              },
            ]}
          />
          <BlurView
            blurAmount={25}
            blurType="dark"
            reducedTransparencyFallbackColor={DarkColor.C900}
            style={[
              StyleSheet.absoluteFill,
              {
                borderRadius: defaultRadius - 1,
              },
            ]}
          />
        </PlatformExplicit>
        <Pressable onPress={openDetails} style={[styles.innerCard]}>
          <PlatformExplicit availablePlatforms={['ios']}>
            <ProgressiveImage
              source={episode.poster_url ?? series.posterUrl}
              style={[styles.poster]}
            />
          </PlatformExplicit>
          <PlatformExplicit availablePlatforms={['android']}>
            <ProgressiveImage
              source={episode.poster_url ?? series.posterUrl}
              style={[styles.poster, { borderRadius: defaultRadius }]}
            />
          </PlatformExplicit>
          <View style={styles.titleRow}>
            <Text numberOfLines={2} style={[styles.title, colors.textLight]}>
              {episode.number + '. ' + episode.title}
            </Text>
            <Text
              numberOfLines={2}
              style={[fontStyles.label, colors.textLight]}>
              {series.episodeLength} min
            </Text>
          </View>
          <View style={styles.watchStatus}>
            <UpdateEpisodeWatchStatus
              animeId={series.id}
              episode={episode.number}
              isWatched={isWatched}
            />
            <Icon
              color={colors.textLight.color}
              name={isSelected ? 'chevron-up' : 'chevron-down'}
              size={30}
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
          {isError ? <EpisodePlayerError /> : null}
          {isLoading ? <ActivityIndicator size="large" visible={true} /> : null}
          {data ? (
            data.players.length > 0 ? (
              data.players.map((player: AnimePlayer, index: number) => (
                <EpisodePlayer
                  episodeNumber={episode.number}
                  episodeTitle={'E' + episode.number + ' ' + episode.title}
                  handleDownload={handleDownload}
                  isDownloaded={isDownloaded}
                  key={index}
                  player={player}
                  seriesId={series.id}
                />
              ))
            ) : (
              <EpisodePlayerEmpty />
            )
          ) : null}
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  episodeContainer: {
    marginVertical: 16,
    width: '100%',
    maxWidth: 500,
  },
  poster: {
    width: '30%',
    height: 80,
    borderTopLeftRadius: defaultRadius,
  },
  titleRow: {
    width: '55%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'column',
  },
  watchStatus: {
    width: '15%',
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
  },
  description: {
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  playersListContainer: {
    maxWidth: '100%',
    marginTop: 20,
    gap: 10,
  },
  playersLoading: {
    height: 70,
    backgroundColor: DarkColor.C900,
    borderRadius: defaultRadius,
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
