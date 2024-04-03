import React from 'react';

import { AnimeEpisode } from '@naikamu/shared';
import { Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors, DarkColor, defaultRadius, fontStyles } from '../../styles';

export const EpisodeNumber = ({
  items,
  onPress,
}: {
  items: AnimeEpisode[];
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    style={[
      {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'transparent',
        backgroundColor: DarkColor.C800,
        borderRadius: defaultRadius,
        paddingHorizontal: 15,
        marginTop: 15,
      },
    ]}>
    <Text style={[fontStyles.normal, colors.textLight, { textAlign: 'left' }]}>
      {items.at(0)?.number} - {items.at(-1)?.number}
    </Text>
    <Icon name="chevron-right" size={20} style={[colors.textLight]} />
  </Pressable>
);
