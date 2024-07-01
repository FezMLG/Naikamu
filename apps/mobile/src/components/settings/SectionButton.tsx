import React from 'react';

import {
  Image,
  ImageRequireSource,
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
  logo,
  external,
  style,
}: {
  title: string;
  onPress: () => void;
  icon?: string;
  logo?: ImageRequireSource;
  external?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <View style={styles.titleContainer}>
        {icon ? (
          <Icon color={colors.textDark.color} name={icon} size={24} />
        ) : null}
        {logo ? (
          <Image resizeMode="contain" source={logo} style={styles.logo} />
        ) : null}
        <Text style={[colors.textDark, styles.title]}>{title}</Text>
      </View>
      {external ? (
        <Icon color={colors.textDark.color} name="open-in-new" size={24} />
      ) : (
        <Icon color={colors.textDark.color} name="chevron-right" size={24} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
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
  logo: {
    width: 30,
  },
});
