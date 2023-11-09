import React, { ComponentProps, useState } from 'react';

import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { colors } from '../../../styles';

interface SelectableProps extends ComponentProps<typeof Pressable> {
  customStyles?: StyleProp<ViewStyle>[];
}

export const Selectable = (props: SelectableProps) => {
  const { customStyles = [], children } = props;
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Pressable
      onBlur={() => setIsFocus(() => false)}
      onFocus={() => {
        setIsFocus(() => true);
      }}
      style={[
        ...customStyles,
        styles.borderBase,
        isFocus
          ? { borderColor: colors.accent.color }
          : { borderColor: 'transparent' },
      ]}
      {...props}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  borderBase: {
    borderWidth: 1,
    borderStyle: 'solid',
  },
});
