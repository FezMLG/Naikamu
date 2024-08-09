import React from 'react';

import { Pressable, Text } from 'react-native';

import { colors, DarkColor, defaultRadius, fontStyles } from '../../../styles';

export type AlertProps = {
  title: string;
  message: string;
  onPress: () => void;
};

export const Alert: React.FC<AlertProps> = ({ title, message, onPress }) => (
  <Pressable
    onPress={onPress}
    style={{
      backgroundColor: DarkColor.C700,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: defaultRadius,
    }}>
    <Text style={[fontStyles.header, colors.accent, fontStyles.bold]}>
      {title}
    </Text>
    <Text style={[fontStyles.normal, colors.textLight]}>{message}</Text>
  </Pressable>
);
