import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

export const TVButton = (props: {
  children: React.ReactNode;
  onPress: () => void;
  style: any[];
  icon?: IconSource | undefined;
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <Pressable
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      onPress={props.onPress}>
      <Button
        icon={props.icon}
        mode={focus ? 'contained' : 'contained-tonal'}
        style={[styles.button, ...props.style]}>
        {props.children}
      </Button>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {},
});
