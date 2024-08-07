import React, { ComponentProps, useState } from 'react';

import {
  StyleProp,
  TextStyle,
  ViewStyle,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors, defaultRadius } from '../../../styles';
import { ActivityIndicator } from '../ActivityIndicator';

type ButtonType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'link';

type SizeType = 'small' | 'medium' | 'large';

type WidthType = 'auto' | 'short' | 'medium' | 'full' | 'long';

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
    style = [],
    loading,
    size = 'medium',
    width = 'full',
  }: ButtonProps = props;
  const [isFocus, setIsFocus] = useState(false);

  const textStyle: Record<ButtonType, TextStyle> = {
    primary: {
      color: colors.textLight.color,
      fontWeight: 'bold',
    },
    secondary: {
      color: colors.textLight.color,
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

  const textFocusStyle: Record<ButtonType, TextStyle> = {
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
      backgroundColor: colors.transparent.color,
      borderColor: colors.accent.color,
    },
    secondary: {
      borderColor: colors.textLighter.color,
      backgroundColor: colors.background.color,
    },
    link: {
      backgroundColor: colors.transparent.color,
    },
    success: {},
    warning: {
      borderColor: colors.error.color,
      backgroundColor: colors.transparent.color,
    },
    danger: {},
  };

  const buttonFocusStyle: Record<ButtonType, ViewStyle> = {
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
    long: {
      width: 300,
    },
    full: {
      width: '100%',
    },
  };

  return (
    <Pressable
      onBlur={() => setIsFocus(() => false)}
      onFocus={() => {
        setIsFocus(() => true);
      }}
      onPress={onPress}
      style={[
        styles.container,
        ...style,
        styles.borderBase,
        sizeStyle[size],
        widthStyle[width],
        isFocus ? buttonFocusStyle[type] : buttonStyle[type],
        isFocus ? { borderColor: colors.accent.color } : {},
      ]}
      {...props}>
      {loading ? <ActivityIndicator size="small" /> : null}
      <Text
        style={[
          styles.baseText,
          isFocus ? textFocusStyle[type] : textStyle[type],
        ]}>
        {label}
      </Text>
      {icon ? (
        <Icon
          color={
            isFocus
              ? textFocusStyle[type].color
              : textStyle[type].color || colors.textLight.color
          }
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
    borderWidth: 2,
    borderStyle: 'solid',
  },
});
