import React, { useState } from 'react';

import { AnimeEpisode, AnimePlayer } from '@aniwatch/shared';
import { BlurView } from '@react-native-community/blur';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useQuerySeriesEpisodePlayers } from '../../api/hooks';
import {
  useOfflineService,
  useVideoProgress,
  createEpisodeProgressKey,
} from '../../services';
import { useUserSettingsService } from '../../services/settings/settings.service';
import {
  DarkColor,
  darkStyle,
  colors,
  defaultRadius,
  fontStyles,
} from '../../styles';
import { ActivityIndicator } from '../atoms';
import { maxWidth } from '../maxDimensions';
import { UpdateEpisodeWatchStatus } from '../molecules';

import { EpisodePlayer, EpisodePlayerEmpty } from './EpisodePlayer';

export function Episode({
  episode,
  posterUrl,
  id,
  animeName,
  isWatched,
  episodeLength,
}: {
  episode: AnimeEpisode;
  posterUrl: string;
  id: string;
  animeName: string;
  isWatched: boolean;
  episodeLength: number;
}) {
  const { data, refetch } = useQuerySeriesEpisodePlayers(id, episode.number);
  const [isSelected, setIsSelected] = useState(false);
  const { addOfflineSeries, addToQueue } = useOfflineService();
  const { progress, loadProgress } = useVideoProgress(
    createEpisodeProgressKey(id, episode.number),
  );
  const {
    userSettings: { preferredDownloadQuality },
  } = useUserSettingsService();
  const { checkIfEpisodeIsDownloaded } = useOfflineService();

  const [isDownloaded, setIsDownloaded] = useState(false);

  const openDetails = () => {
    setIsSelected(previous => !previous);
    checkIfEpisodeIsDownloaded(id, episode.number).then(setIsDownloaded);
    refetch();
  };

  loadProgress();

  const handleDownload = async (player: AnimePlayer) => {
    const episodeToAdd = {
      number: episode.number,
      title: episode.title,
      length: episodeLength,
      translator: player.translator_name,
      pathToFile: null,
      size: 0,
    };

    await addOfflineSeries({
      seriesId: id,
      title: animeName,
      quality: preferredDownloadQuality,
      episodes: [],
    });
    await addToQueue({
      seriesId: id,
      episode: episodeToAdd,
      fileUrl: player.player_link,
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
        <Image
          key="blurryImage"
          source={{ uri: episode.poster_url ?? posterUrl }}
          style={StyleSheet.absoluteFill}
        />
        <BlurView
          blurAmount={25}
          blurType="dark"
          reducedTransparencyFallbackColor={DarkColor.C900}
          style={[StyleSheet.absoluteFill]}
        />
        <Pressable onPress={openDetails} style={[styles.innerCard]}>
          <Image
            source={{ uri: episode.poster_url ?? posterUrl }}
            style={[
              styles.poster,
              (!isSelected && episode.description) || progress
                ? null
                : {
                    borderBottomLeftRadius: defaultRadius,
                  },
            ]}
          />
          <View style={styles.titleRow}>
            <Text numberOfLines={2} style={[styles.title, colors.textLight]}>
              {episode.number + '. ' + episode.title}
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
                  seriesId={id}
                />
              ))
            ) : (
              <EpisodePlayerEmpty />
            )
          ) : (
            <ActivityIndicator
              size="large"
              style={styles.playersLoading}
              visible
            />
          )}
        </View>
      ) : null}
    </SafeAreaView>
  );
}

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
    borderColor: DarkColor.C800,
  },
  description: {
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  playersListContainer: {
    backgroundColor: DarkColor.C900,
    borderRadius: defaultRadius,
    maxWidth: '100%',
    marginTop: 20,
    gap: 10,
  },
  playersLoading: {
    height: 70,
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
