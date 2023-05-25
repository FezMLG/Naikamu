import React from 'react';
import { ActivityIndicator as PIA } from 'react-native-paper';

import { colors } from '../../../styles';

export const ActivityIndicator = ({
  visible,
  size = 'small',
}: {
  visible: boolean;
  size?: 'small' | 'large';
}) => {
  return <PIA size={size} animating={visible} color={colors.accent.color} />;
};
