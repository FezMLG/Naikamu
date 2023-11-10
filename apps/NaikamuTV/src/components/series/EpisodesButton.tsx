import React from 'react';

import { NavigationProp, useNavigation } from '@react-navigation/native';

import { useTranslate } from '../../i18n/useTranslate';
import {
  SeriesStackParameterList as SeriesStackParameterList,
  SeriesStackScreenNames,
} from '../../routes';
import { Button } from '../atoms';

export function EpisodesButton() {
  const navigation = useNavigation<NavigationProp<SeriesStackParameterList>>();
  const { translate } = useTranslate();

  return (
    <Button
      hasTVPreferredFocus
      icon="play-box-multiple"
      label={translate('anime_details.see_episodes')}
      onPress={() => {
        navigation.navigate(SeriesStackScreenNames.Episodes);
      }}
      type="secondary"
      width="long"
    />
  );
}
