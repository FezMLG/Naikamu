import { useQuery } from '@tanstack/react-query';
import {
  AnimeDetails,
  WatchListAnime,
  WatchStatus,
} from '../../../../../../lib/shared/dist';
import { useTranslate } from '../../../i18n/useTranslate';
import { APIClient } from '../../../api/APIClient';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames, SeriesScreenProps } from '../../../routes/main';
import { Button, Text } from 'react-native-paper';
import { AddToWatchList } from './AddToWatchList';

interface SeriesDetailsWatchProps {
  series: AnimeDetails;
}

export const SeriesDetailsWatch = ({ series }: SeriesDetailsWatchProps) => {
  const apiClient = new APIClient();
  const { navigation } = useNavigation<SeriesScreenProps>();
  const { translate } = useTranslate();
  const { data } = useQuery<WatchListAnime>(
    ['anime', series.id, 'watch-list'],
    () => apiClient.getUserWatchListSeries(series.id),
  );

  return (
    <>
      {data ? (
        <>
          <Button
            icon="play-box-multiple"
            onPress={() => {
              navigation.navigate(ScreenNames.Episodes, {
                id: series.id,
                title: series.title.romaji,
                numOfAiredEpisodes: series.nextAiringEpisode?.episode
                  ? series.nextAiringEpisode?.episode - 1
                  : series.episodes,
                posterUrl: series.coverImage.extraLarge,
              });
            }}
            mode={'contained'}>
            {translate('anime_details.see_episodes')}
          </Button>
          {data.status == WatchStatus.OnList ||
          data.status == WatchStatus.Watching ? (
            <Text>On List</Text>
          ) : (
            <AddToWatchList animeId={series.id} />
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
