import React from 'react';

import Animated from 'react-native-reanimated';

import { useTranslate } from '../../i18n/useTranslate';
import { userVisibleWatchStatuses, useWatchListStore } from '../../services';
import { colors } from '../../styles';
import { Chip } from '../atoms';

export const WatchListFilters = ({
  animatedTransform,
  animatedHeight,
}: {
  animatedTransform: {
    transform: { translateY: number }[];
  };
  animatedHeight: {
    height: number;
  };
}) => {
  const { translate } = useTranslate();
  const filtersActions = useWatchListStore(state => state.actions);

  return (
    <>
      <Animated.ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}
        horizontal
        showsVerticalScrollIndicator={false}
        style={[
          {
            height: 50,
            backgroundColor: colors.background.color,
            position: 'absolute',
            top: 0,
            left: 0,
            elevation: 4,
            zIndex: 1,
          },
          animatedTransform,
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
      <Animated.View style={[animatedHeight]} />
    </>
  );
};
