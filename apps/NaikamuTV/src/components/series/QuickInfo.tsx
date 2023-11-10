import React from 'react';

import { StyleProp, ViewStyle, TextStyle, View, Text } from 'react-native';

import { colors, darkStyle, fontStyles } from '../../styles';
import { Dot } from '../atoms/Dot';

export function QuickInfo({
  value,
  prefix,
  suffix,
  isLast = false,
  styleView = [],
}: {
  value?: string | number;
  prefix?: string;
  suffix?: string;
  isLast?: boolean;
  styleView?: StyleProp<ViewStyle>[];
}) {
  return (
    <>
      {value ? (
        <>
          <View style={[...styleView]}>
            <Text style={[colors.textLight, fontStyles.label]}>
              {prefix}
              {value.toString().trim()}
              {suffix}
            </Text>
          </View>
          {isLast ? null : <Dot />}
        </>
      ) : null}
    </>
  );
}
