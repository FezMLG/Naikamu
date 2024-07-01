import React from 'react';

import { QueryObserverResult } from '@tanstack/react-query';
import { Pressable } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../../../styles';

const duration = 1000;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);

export const RefreshButton = ({
  refresh,
}: {
  refresh: () => Promise<QueryObserverResult>;
}) => {
  const sv = useSharedValue<number>(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value * 360}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={() => refresh()}
        onPressIn={() => {
          sv.value = withTiming(1, { duration, easing }, () => (sv.value = 0));
        }}>
        <Icon color={colors.textLight.color} name="refresh" size={30} />
      </Pressable>
    </Animated.View>
  );
};
