import React, { useState } from 'react';

import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors, fontStyles } from '../../../styles';

interface ChipProps extends Omit<PressableProps, 'style'> {
  label: string;
}

export const Chip = (props: ChipProps) => {
  const { label, onPress, ...pressableProps } = props;
  const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <Pressable
      onPress={event => {
        setIsSelected(previousState => !previousState);
        if (onPress) {
          onPress(event);
        }
      }}
      style={[
        styles.container,
        {
          backgroundColor: isSelected ? colors.accent.color : 'transparent',
          paddingLeft: isSelected ? 10 : 15,
          borderColor: isSelected ? 'transparent' : colors.onBackground.color,
        },
      ]}
      {...pressableProps}>
      {isSelected ? (
        <Icon color={colors.textLight.color} name="check" size={18} />
      ) : null}
      <Text
        style={[fontStyles.label, colors.textLight, { fontWeight: 'bold' }]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 35,
    backgroundColor: 'transparent',
    width: 'auto',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.onBackground.color,
    marginHorizontal: 5,
  },
});
