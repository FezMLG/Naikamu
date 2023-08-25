import React from 'react';

import { StyleProp, ViewStyle } from 'react-native';
import { ActivityIndicator as PIA } from 'react-native-paper';

import { colors } from '../../../styles';

export function ActivityIndicator({
  visible,
  size = 'small',
  style = [],
}: {
  visible: boolean;
  size?: 'small' | 'large';
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <PIA
      animating={visible}
      color={colors.accent.color}
      size={size}
      style={style}
    />
  );
}
