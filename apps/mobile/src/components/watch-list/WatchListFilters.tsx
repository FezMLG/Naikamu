import React from 'react';

import { WatchStatus } from '@naikamu/shared';
import { ScrollView } from 'react-native';

import { useTranslate } from '../../i18n/useTranslate';
import { useWatchListStore } from '../../services';
import { Chip } from '../atoms';

const userVisibleWatchStatuses: WatchStatus[] = [
  WatchStatus.Planning,
  WatchStatus.Watching,
  WatchStatus.Completed,
  WatchStatus.OnHold,
  WatchStatus.Dropped,
];

export const WatchListFilters = () => {
  const { translate } = useTranslate();
  const filtersActions = useWatchListStore(state => state.actions);

  return (
    <ScrollView
      horizontal
      style={[
        {
          paddingTop: 10,
        },
      ]}>
      {userVisibleWatchStatuses.map((element, index) => (
        <Chip
          key={index}
          label={translate(`watch_list.${element}`)}
          onPress={() => {
            filtersActions.updateFilters(element, element);
          }}
        />
      ))}
    </ScrollView>
  );
};
