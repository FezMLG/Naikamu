import React from 'react';

import { WatchStatus } from '@naikamu/shared';
import { ScrollView } from 'react-native';

import { useWatchListStore } from '../../services';
import { Chip } from '../atoms';

export const WatchListFilters = () => {
  // const selectedFilters = useWatchListStore(state => state.filters);
  const filtersActions = useWatchListStore(state => state.actions);

  return (
    <ScrollView
      horizontal
      style={[
        {
          paddingTop: 10,
        },
      ]}>
      {/*{[...selectedFilters.keys()].map(k => (*/}
      {/*  <Text key={k} style={colors.textLight}>*/}
      {/*    {selectedFilters.get(k)}*/}
      {/*  </Text>*/}
      {/*))}*/}
      {Object.values(WatchStatus).map((element, index) => (
        <Chip
          key={index}
          label={element}
          onPress={() => {
            filtersActions.updateFilters(element, element);
          }}
        />
      ))}
    </ScrollView>
  );
};
