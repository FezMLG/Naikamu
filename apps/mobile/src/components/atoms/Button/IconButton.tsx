import React from 'react';

import { GestureResponderEvent, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../../../styles';

type IconButtonProps = {
  icon: string;
  onPress: (event: GestureResponderEvent) => void;
};

export const IconButton = (props: IconButtonProps) => {
  const { icon, onPress } = props;

  return (
    <Pressable onPress={onPress}>
      <Icon
        name={icon}
        size={24}
        style={[{ marginHorizontal: 10 }, colors.textLight]}
      />
    </Pressable>
  );
};
