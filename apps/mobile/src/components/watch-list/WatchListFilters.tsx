import React from 'react';

import { Animated } from 'react-native';

import { useTranslate } from '../../i18n/useTranslate';
import { userVisibleWatchStatuses, useWatchListStore } from '../../services';
import { colors } from '../../styles';
import { Chip } from '../atoms';

export const WatchListFilters = ({ translateY }: { translateY: any }) => {
  const { translate } = useTranslate();
  const filtersActions = useWatchListStore(state => state.actions);

  return (
    <Animated.ScrollView
      contentContainerStyle={{
        alignItems: 'center',
      }}
      horizontal
      showsVerticalScrollIndicator={false}
      style={[
        {
          height: 50,
          transform: [{ translateY: translateY }],
          backgroundColor: colors.background.color,
          position: 'absolute',
          top: 0,
          left: 0,
          elevation: 4,
          zIndex: 1,
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
    </Animated.ScrollView>
  );
};
