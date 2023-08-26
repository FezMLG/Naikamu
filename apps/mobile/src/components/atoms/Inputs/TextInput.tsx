import React, { useState } from 'react';

import { StyleSheet, TextInput as RNTextInput } from 'react-native';

export const TextInput = () => {
  const [text, onChangeText] = useState('Useless Text');

  return (
    <RNTextInput
      onChangeText={onChangeText}
      style={styles.input}
      value={text}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
