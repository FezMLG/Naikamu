import React from 'react';

import { AnimeDetails } from '@naikamu/shared';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { useTranslate } from '../../i18n/useTranslate';
import {
  SeriesStackParameterList as SeriesStackParameterList,
  SeriesStackScreenNames,
} from '../../routes';
import { Button } from '../atoms';
import { Text, View } from 'react-native';
import { colors, fontStyles } from '../../styles';

interface EpisodesButtonProps {
  series: AnimeDetails;
}

export function EpisodesButton({ series }: EpisodesButtonProps) {
  const navigation = useNavigation<NavigationProp<SeriesStackParameterList>>();
  const { translate } = useTranslate();

  if (series.episodesDisabled) {
    return (
      <View>
        <Text numberOfLines={2} style={[fontStyles.headerSmall, colors.grey]}>
          {series.episodesDisabledReason ??
            translate('anime_episodes.disabled.default')}
        </Text>
      </View>
    );
  }

  return (
    <Button
      icon="play-box-multiple"
      label={translate('anime_details.see_episodes')}
      onPress={() => {
        navigation.navigate(SeriesStackScreenNames.Episodes, {
          seriesId: series.id,
        });
      }}
      type="secondary"
    />
  );
}
