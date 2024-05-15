import React from 'react';

import { Linking, Pressable, Text } from 'react-native';

import { colors } from '../../../styles';

export const Link = ({ URL, label }: { URL: string; label: string }) => (
  <Pressable
    onPress={async () => {
      await Linking.openURL(URL);
    }}>
    <Text
      style={[
        {
          textDecorationLine: 'underline',
        },
        colors.accent,
      ]}>
      {label}
    </Text>
  </Pressable>
);
