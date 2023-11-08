import React, { useState } from 'react';

import { GestureResponderEvent, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../../../styles';

type IconButtonProps = {
  icon: string;
  onPress: (event: GestureResponderEvent) => void;
  size?: number;
};

export const IconButton = (props: IconButtonProps) => {
  const { icon, onPress, size = 24 } = props;
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Pressable
      onBlur={() => setIsFocus(() => false)}
      onFocus={() => {
        setIsFocus(() => true);
      }}
      onPress={onPress}
      style={[
        {
          borderWidth: 1,
          borderStyle: 'solid',
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 40,
        },
        isFocus
          ? { borderColor: colors.accent.color }
          : { borderColor: 'transparent' },
      ]}>
      <Icon name={icon} size={size} style={[colors.textLight]} />
    </Pressable>
  );
};
