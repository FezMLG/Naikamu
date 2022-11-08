import React from 'react';
import {
  Platform,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
  StyleSheet,
} from 'react-native';
import { Text } from 'react-native-paper';
import { darkStyle } from '../../styles/darkMode.style';

const { isTV } = Platform;
export const QuickInfo = ({
  name,
  value,
  styleView = [],
  styleText = [],
}: {
  name: string;
  value: any;
  styleView?: StyleProp<ViewStyle>[];
  styleText?: StyleProp<TextStyle>[];
}) => {
  return (
    <View style={[styles.quickInfoContainer, ...styleView]}>
      <Text style={[isTV ? styles.titleType : null, darkStyle.font]}>
        {name}
      </Text>
      <Text style={[isTV ? null : styles.titleType, darkStyle.font, styleText]}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleType: {
    fontWeight: 'bold',
  },
  quickInfoContainer: {
    marginRight: 10,
  },
});
