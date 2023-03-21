import React from 'react';
import { AnimeDetails } from '@aniwatch/shared';
import { useTranslate } from '../../i18n/useTranslate';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, ScreenNames } from '../../routes/main';
import { Button } from '../atoms';

interface EpisodesButtonProps {
  series: AnimeDetails;
}

export const EpisodesButton = ({ series }: EpisodesButtonProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { translate } = useTranslate();

  return (
    <Button
      type="secondary"
      icon="play-box-multiple"
      onPress={() => {
        navigation.navigate(ScreenNames.Episodes, {
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
      label={translate('anime_details.see_episodes')}
    />
  );
};
