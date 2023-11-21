import React, { ComponentProps, useState } from 'react';

import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { colors } from '../../../styles';

interface SelectableProps extends ComponentProps<typeof Pressable> {
  customStyles?: StyleProp<ViewStyle>[];
  focusStyle?: StyleProp<ViewStyle>[];
}

export const Selectable = (props: SelectableProps) => {
  const { customStyles = [], focusStyle = [], children } = props;
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Pressable
      onBlur={() => setIsFocus(() => false)}
      onFocus={() => {
        setIsFocus(() => true);
      }}
      style={[
        styles.borderBase,
        ...customStyles,
        isFocus ? { borderColor: colors.accent.color } : {},
        isFocus ? focusStyle : {},
      ]}
      {...props}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  borderBase: {
    borderWidth: 2,
    borderStyle: 'solid',
  },
});
