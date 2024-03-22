import React from 'react';

import {
  ActivityIndicator as RNActivityIndicator,
  ActivityIndicatorProps as RNActivityIndicatorProps,
} from 'react-native';

import { colors } from '../../../styles';

type ActivityIndicatorProps = Omit<RNActivityIndicatorProps, 'color'>;

export const ActivityIndicator = (props: ActivityIndicatorProps) => (
  <RNActivityIndicator color={colors.accent.color} {...props} />
);
