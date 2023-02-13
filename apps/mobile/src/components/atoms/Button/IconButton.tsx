import React from 'react';
import { Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface IconButtonProps {
  text: string;
  icon: string;
  size: number;
  color: string;
}

export const IconButton = ({ text, icon, size, color }: IconButtonProps) => {
  return (
    <Pressable>
      <Icon name={icon} size={size} color={color} />
      <Text>{text}</Text>
    </Pressable>
  );
};
