import React from 'react';

import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors, defaultRadius } from '../../styles';

export function SectionButton({
  title,
  onPress,
  icon,
  style,
}: {
  title: string;
  onPress: () => void;
  icon: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <View style={styles.titleContainer}>
        <Icon color={colors.textDark.color} name={icon} size={24} />
        <Text style={[colors.textDark, styles.title]}>{title}</Text>
      </View>
      <Icon color={colors.textDark.color} name="chevron-right" size={24} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: defaultRadius,
    backgroundColor: colors.onBackground.color,
    justifyContent: 'space-between',
    marginVertical: 10,
    alignSelf: 'stretch',
  },
  title: {},
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
