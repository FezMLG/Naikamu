import React from 'react';

import { AnimeDetails } from '@aniwatch/shared';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { useTranslate } from '../../i18n/useTranslate';
import {
  SeriesStackParamList as SeriesStackParameterList,
  SeriesStackScreenNames,
} from '../../routes';
import { Button } from '../atoms';

interface EpisodesButtonProps {
  series: AnimeDetails;
}

export function EpisodesButton({ series }: EpisodesButtonProps) {
  const navigation = useNavigation<NavigationProp<SeriesStackParameterList>>();
  const { translate } = useTranslate();

  return (
    <Button
      icon="play-box-multiple"
      label={translate('anime_details.see_episodes')}
      onPress={() => {
        navigation.navigate(SeriesStackScreenNames.Episodes, {
          id: series.id,
          title: series.title.romaji,
          numOfAiredEpisodes: series.nextAiringEpisode?.episode
            ? series.nextAiringEpisode?.episode - 1
            : series.episodes
            ? series.episodes
            : 12,
          posterUrl: series.coverImage.extraLarge,
          episodeLength: series.duration,
        });
      }}
      type="secondary"
    />
  );
}
