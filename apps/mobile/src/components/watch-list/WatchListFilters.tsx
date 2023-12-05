import React from 'react';

import { WatchStatus } from '@naikamu/shared';
import { ScrollView } from 'react-native';

import { useTranslate } from '../../i18n/useTranslate';
import { useWatchListStore } from '../../services';
import { Chip } from '../atoms';

const userVisibleWatchStatuses: {
  key: WatchStatus;
  isDefaultActive: boolean;
}[] = [
  { key: WatchStatus.Planning, isDefaultActive: true },
  { key: WatchStatus.Watching, isDefaultActive: true },
  { key: WatchStatus.Completed, isDefaultActive: false },
  { key: WatchStatus.OnHold, isDefaultActive: false },
  { key: WatchStatus.Dropped, isDefaultActive: false },
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
          initialState={element.isDefaultActive}
          key={index}
          label={translate(`watch_list.${element.key}`)}
          onPress={() => {
            filtersActions.updateFilters(element.key, element.key);
          }}
        />
      ))}
    </ScrollView>
  );
};
