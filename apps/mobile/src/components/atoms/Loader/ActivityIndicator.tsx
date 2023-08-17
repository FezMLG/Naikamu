import React from 'react';
import { ActivityIndicator as PIA } from 'react-native-paper';

import { colors } from '../../../styles';
import { StyleProp, ViewStyle } from 'react-native';

export const ActivityIndicator = ({
  visible,
  size = 'small',
  style = [],
}: {
  visible: boolean;
  size?: 'small' | 'large';
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <PIA
      size={size}
      animating={visible}
      color={colors.accent.color}
      style={style}
    />
  );
};
