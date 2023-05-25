import React from 'react';
import { ActivityIndicator as PIA } from 'react-native-paper';

import { colors } from '../../../styles';

export const ActivityIndicator = ({ visible }: { visible: boolean }) => {
  return <PIA animating={visible} color={colors.accent.color} />;
};
