import React, { ComponentProps, ReactElement, useRef, useState } from 'react';

import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput as RNTextInput,
  TextInputFocusEventData,
} from 'react-native';

import { colors, defaultRadius } from '../../../styles';

export const TextInput = (
  props: ComponentProps<typeof RNTextInput>,
): ReactElement<RNTextInput> => {
  const [focus, setFocus] = useState<boolean>(false);

  const onFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (props.onFocus) {
      props.onFocus(event);
    }

    setFocus(() => true);
  };

  const onBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (props.onBlur) {
      props.onBlur(event);
    }

    setFocus(() => false);
  };

  return (
    <RNTextInput
      {...props}
      onBlur={onBlur}
      onFocus={onFocus}
      placeholderTextColor={colors.textLighter.color}
      style={[
        styles.input,
        focus
          ? {
              borderColor: colors.accent.color,
            }
          : null,
        props.style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: colors.textLight.color,
    borderRadius: defaultRadius,
    maxWidth: 500,
    width: '100%',
    borderColor: colors.textLighter.color,
  },
});
