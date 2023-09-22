import React, { ComponentProps } from 'react';

import {
  StyleProp,
  TextStyle,
  ViewStyle,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors, defaultRadius } from '../../../styles';
import { ActivityIndicator } from '../Loader';

interface ButtonProps extends ComponentProps<typeof Pressable> {
  label: string;
  type: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'link';
  icon?: string;
  style?: StyleProp<ViewStyle>[];
  loading?: boolean;
}

export function Button(props: ButtonProps) {
  const {
    type,
    label,
    icon,
    onPress,
    disabled,
    style = [],
    loading,
  }: ButtonProps = props;
  const textStyle: StyleProp<TextStyle> = {
    ...colors.textLight,
    fontWeight: 'bold',
  };
  const buttonStyle: StyleProp<ViewStyle> = {
    backgroundColor: colors.accent.color,
    ...styles.borderBase,
    borderColor: 'transparent',
  };

  switch (type) {
    case 'secondary': {
      textStyle.color = colors.textDark.color;
      buttonStyle.backgroundColor = colors.onBackground.color;
      break;
    }
    case 'warning': {
      buttonStyle.backgroundColor = colors.transparent.color;
      buttonStyle.borderColor = colors.error.color;
      break;
    }
    case 'link': {
      textStyle.fontWeight = 'normal';
      buttonStyle.backgroundColor = colors.transparent.color;
      break;
    }
  }

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, ...style, buttonStyle]}>
      {icon ? (
        <Icon
          color={textStyle.color}
          name={icon}
          size={24}
          style={styles.icon}
        />
      ) : null}
      <Text style={[styles.baseText, textStyle]}>{label}</Text>
      {loading ? (
        <ActivityIndicator
          color={colors.textLight.color}
          size="small"
          visible={loading}
        />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    alignSelf: 'stretch',
    borderRadius: defaultRadius,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  baseText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
  },
  icon: {
    marginRight: 10,
  },
  borderBase: {
    borderWidth: 1,
    borderStyle: 'solid',
  },
});
