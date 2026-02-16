import React, { useEffect, useState } from 'react';

import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors, fontStyles } from '../../../styles';

interface ChipProps extends Omit<PressableProps, 'style'> {
  label: string;
  initialState?: boolean;
}

export const Chip = (props: ChipProps) => {
  const { label, onPress, initialState, disabled, ...pressableProps } = props;
  const [isSelected, setIsSelected] = useState<boolean>(initialState ?? false);

  useEffect(() => {
    setIsSelected(initialState ?? false);
  }, [initialState]);

  return (
    <Pressable
      accessibilityHint={`${isSelected ? 'Remove' : 'Add'} ${label} filter`}
      accessibilityLabel={`${label} filter`}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isSelected, disabled: disabled === true }}
      disabled={disabled}
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
          opacity: disabled ? 0.5 : 1,
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
