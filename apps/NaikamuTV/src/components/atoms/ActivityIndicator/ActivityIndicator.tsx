import React from 'react';

import {
  ActivityIndicator as RNActivityIndicator,
  ActivityIndicatorProps as RNActivityIndicatorProps,
} from 'react-native';

type ActivityIndicatorProps = Omit<RNActivityIndicatorProps, 'color'>;

export const ActivityIndicator = (props: ActivityIndicatorProps) => (
  <RNActivityIndicator color="#0000ff" {...props} />
);
