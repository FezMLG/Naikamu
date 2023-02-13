import React from 'react';
import { AnimeDetails } from '../../../../../../lib/shared/dist';
import { useTranslate } from '../../../i18n/useTranslate';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../routes/main';
import { Button } from 'react-native-paper';
import { AddToWatchList } from './AddToWatchList';

interface SeriesDetailsWatchProps {
  series: AnimeDetails;
}

export const SeriesDetailsWatch = ({ series }: SeriesDetailsWatchProps) => {
  const navigation = useNavigation<any>();
  const { translate } = useTranslate();

  return (
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
      <AddToWatchList seriesId={series.id} watchStatus={series.watchStatus} />
    </>
  );
};
