import React, { ReactNode, useState } from 'react';

import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';
import { default as Config } from 'react-native-config';

import { colors, fontStyles, globalStyle } from '../styles';

import { Modal } from './atoms';

export const EnvironmentDebug = ({
  children,
  style = [],
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal.Container isOpen={isOpen} setIsOpen={setIsOpen}>
        <Modal.Title title="Debug" />
        {Object.entries(Config).map(([key, value], index) => (
          <View key={index}>
            <Text
              style={[
                fontStyles.label,
                colors.textLight,
                globalStyle.marginTopSmall,
              ]}>
              {key}
            </Text>
            <Text style={[fontStyles.text, colors.textLighter]}>{value}</Text>
          </View>
        ))}
      </Modal.Container>
      <Pressable
        delayLongPress={1000}
        onLongPress={() => setIsOpen(true)}
        style={style}>
        {children}
      </Pressable>
    </>
  );
};
