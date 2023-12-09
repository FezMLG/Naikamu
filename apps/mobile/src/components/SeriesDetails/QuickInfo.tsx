import React from 'react';

import { StyleProp, ViewStyle, TextStyle, View } from 'react-native';
import { Text } from 'react-native-paper';

import { darkStyle } from '../../styles';

export function QuickInfo({
  value,
  prefix,
  suffix,
  styleView = [],
  styleText = [],
}: {
  value?: string | number;
  prefix?: string;
  suffix?: string;
  styleView?: StyleProp<ViewStyle>[];
  styleText?: StyleProp<TextStyle>[];
}) {
  return (
    <>
      {value ? (
        <View style={[...styleView]}>
          <Text style={[darkStyle.font, styleText]}>
            {prefix}
            {value.toString().trim()}
            {suffix}
          </Text>
        </View>
      ) : null}
    </>
  );
}
