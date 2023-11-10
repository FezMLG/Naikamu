import React from 'react';

import { Text } from 'react-native';

import { colors, fontStyles } from '../../../styles';

export const Dot = () => (
  <Text style={[fontStyles.label, colors.textLight]}>•</Text>
);
