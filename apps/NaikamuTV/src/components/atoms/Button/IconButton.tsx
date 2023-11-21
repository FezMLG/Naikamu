import React from 'react';

import { GestureResponderEvent } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../../../styles';

import { Selectable } from './Selectable';

type IconButtonProps = {
  icon: string;
  onPress: (event: GestureResponderEvent) => void;
  size?: number;
};

export const IconButton = (props: IconButtonProps) => {
  const { icon, onPress, size = 24 } = props;

  return (
    <Selectable
      customStyles={[
        {
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'transparent',
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 40,
        },
      ]}
      onPress={onPress}>
      <Icon name={icon} size={size} style={[colors.textLight]} />
    </Selectable>
  );
};
