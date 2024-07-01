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

import { colors, defaultRadius, globalStyle } from '../../../styles';
import { ActivityIndicator } from '../Loader';

type ButtonType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'link';

type SizeType = 'small' | 'medium' | 'large';

type WidthType = 'auto' | 'short' | 'medium' | 'full';

interface ButtonProps extends ComponentProps<typeof Pressable> {
  label: string;
  type: ButtonType;
  size?: SizeType;
  icon?: string;
  style?: StyleProp<ViewStyle>[];
  loading?: boolean;
  width?: WidthType;
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
    size = 'medium',
    width = 'full',
  }: ButtonProps = props;
  const textStyle: Record<ButtonType, TextStyle> = {
    primary: {
      color: colors.textLight.color,
      fontWeight: 'bold',
    },
    secondary: {
      color: colors.textDark.color,
    },
    link: {
      color: colors.textLight.color,
      fontWeight: 'normal',
    },
    success: {
      color: colors.textLight.color,
    },
    warning: {
      color: colors.error.color,
    },
    danger: {
      color: colors.error.color,
    },
  };

  const buttonStyle: Record<ButtonType, ViewStyle> = {
    primary: {
      backgroundColor: colors.accent.color,
    },
    secondary: {
      backgroundColor: colors.onBackground.color,
    },
    link: {
      backgroundColor: colors.transparent.color,
    },
    success: {},
    warning: {
      ...styles.borderBase,
      borderColor: colors.error.color,
      backgroundColor: colors.transparent.color,
    },
    danger: {},
  };

  const sizeStyle: Record<SizeType, ViewStyle> = {
    small: {
      height: 40,
    },
    medium: {
      height: 60,
    },
    large: {
      height: 80,
    },
  };

  const widthStyle: Record<WidthType, ViewStyle> = {
    auto: {
      width: 'auto',
    },
    short: {
      width: 100,
    },
    medium: {
      width: 200,
    },
    full: {
      width: '100%',
    },
  };

  const loaderColor: Record<ButtonType, string> = {
    primary: colors.textLight.color,
    secondary: colors.accent.color,
    success: colors.textLight.color,
    warning: colors.textLight.color,
    danger: colors.textLight.color,
    link: colors.textLight.color,
  };

  const disabledStyle: ViewStyle = {
    opacity: 0.5,
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.container,
        ...style,
        disabled ? disabledStyle : {},
        sizeStyle[size],
        widthStyle[width],
        buttonStyle[type],
      ]}>
      {loading ? (
        <ActivityIndicator
          color={loaderColor[type]}
          size="small"
          style={{
            marginRight: 10,
          }}
          visible={loading}
        />
      ) : null}
      <Text style={[styles.baseText, textStyle[type]]}>{label}</Text>
      {icon ? (
        <Icon
          color={textStyle[type].color || colors.textLight.color}
          name={icon}
          size={24}
          style={styles.icon}
        />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginLeft: 10,
  },
  borderBase: {
    borderWidth: 1,
    borderStyle: 'solid',
  },
});
