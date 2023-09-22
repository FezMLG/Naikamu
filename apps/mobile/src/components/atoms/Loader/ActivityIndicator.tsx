import React from 'react';

import { StyleProp, ViewStyle } from 'react-native';
import { ActivityIndicator as PAI } from 'react-native-paper';

import { colors } from '../../../styles';

export function ActivityIndicator({
  visible,
  size = 'small',
  style = [],
  color = colors.accent.color,
}: {
  visible: boolean;
  size?: 'small' | 'large';
  style?: StyleProp<ViewStyle>;
  color?: string;
}) {
  return <PAI animating={visible} color={color} size={size} style={style} />;
}
