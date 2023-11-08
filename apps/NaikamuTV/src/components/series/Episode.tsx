import React, { useState } from 'react';

import { AnimeEpisode, AnimePlayer } from '@naikamu/shared';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useQuerySeriesEpisodePlayers } from '../../api/hooks';
import { useSelectedSeriesStore } from '../../services';
import {
  colors,
  DarkColor,
  darkStyle,
  defaultRadius,
  fontStyles,
} from '../../styles';
import { ProgressiveImage } from '../atoms';
import { PageLayout } from '../PageLayout';

import { EpisodePlayer, EpisodePlayerEmpty } from './EpisodePlayer';

export function Episode({
  episode,
  isWatched,
}: {
  episode: AnimeEpisode;
  isWatched: boolean;
}) {
  const series = useSelectedSeriesStore(store => store.details)!;
  const episodes = useSelectedSeriesStore(store => store.episodes)!;

  const { data, refetch, isLoading, isError } = useQuerySeriesEpisodePlayers(
    series.id,
    episode.number,
  );
  const [isSelected, setIsSelected] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const openDetails = () => {
    setIsSelected(previous => !previous);
    refetch();
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onBlur={() => setIsFocus(() => false)}
        onFocus={() => {
          setIsFocus(() => true);
        }}
        onPress={openDetails}
        style={[
          styles.episodeContainer,
          isFocus
            ? { borderColor: colors.accent.color }
            : { borderColor: 'transparent' },
        ]}>
        <View style={[styles.cardContainer, isSelected && darkStyle.card]}>
          <View style={[styles.innerCard]}>
            <ProgressiveImage
              source={episode.poster_url ?? series.coverImage.extraLarge}
              style={{
                width: '40%',
                height: '100%',
                borderRadius: defaultRadius - 2,
              }}
            />
            <View style={styles.detailsContainer}>
              <Text
                numberOfLines={2}
                style={[fontStyles.header, colors.textLight]}>
                {episode.number + '. ' + episode.title}
              </Text>
              <Text
                numberOfLines={2}
                style={[fontStyles.label, colors.textLight]}>
                {series.duration} min
              </Text>
              {episode.description ? (
                <Text
                  numberOfLines={4}
                  style={[darkStyle.font, fontStyles.text]}>
                  {episode.description}
                </Text>
              ) : null}
            </View>
          </View>
          {/*<EpisodeWatchProgress episodeNumber={episode.number} />*/}
        </View>
      </TouchableOpacity>
      {isSelected ? (
        <View style={styles.playersListContainer}>
          {/*{isError ? <EpisodePlayerError /> : null}*/}
          <PageLayout.Loading isLoading={isLoading} />
          {data ? (
            data.players.length > 0 ? (
              <>
                {data.players
                  .filter(player => player.playerType === 'native')
                  .map((player: AnimePlayer, index: number) => (
                    <EpisodePlayer
                      episodeNumber={episode.number}
                      episodeTitle={'E' + episode.number + ' ' + episode.title}
                      key={player.playerType + index}
                      player={player}
                    />
                  ))}
              </>
            ) : (
              <EpisodePlayerEmpty />
            )
          ) : null}
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  episodeContainer: {
    marginVertical: 16,
    width: '100%',
    maxWidth: 550,
    height: 150,
    flex: 1,
    borderColor: 'blue',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: defaultRadius,
  },
  detailsContainer: {
    width: '60%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'column',
  },
  watchStatus: {
    width: '15%',
    alignItems: 'center',
  },
  innerCard: {
    width: '100%',
    flexDirection: 'row',
    height: '100%',
    // flex: 1,
  },
  cardContainer: {
    borderTopLeftRadius: defaultRadius,
    borderTopRightRadius: defaultRadius,
    width: '100%',
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
