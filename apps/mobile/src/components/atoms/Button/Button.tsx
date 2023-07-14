import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, defaultRadius } from '../../../styles';
import { ActivityIndicator } from '../Loader';

interface ButtonProps {
  label: string;
  type: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'link';
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  icon?: string;
  style?: StyleProp<ViewStyle>[];
  loading?: boolean;
}

export const Button = ({
  type,
  label,
  icon,
  onPress,
  disabled,
  style = [],
  loading = false,
}: ButtonProps) => {
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
    case 'secondary':
      textStyle.color = colors.textDark.color;
      buttonStyle.backgroundColor = colors.onBackground.color;
      break;
    case 'warning':
      buttonStyle.backgroundColor = colors.transparent.color;
      buttonStyle.borderColor = colors.error.color;
      break;
    case 'link':
      textStyle.fontWeight = 'normal';
      buttonStyle.backgroundColor = colors.transparent.color;
      break;
  }

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, ...style, buttonStyle]}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator visible={loading} size={'small'} />
      ) : (
        <>
          {icon ? (
            <Icon
              name={icon}
              size={24}
              color={textStyle.color}
              style={styles.icon}
            />
          ) : null}
          <Text style={[styles.baseText, textStyle]}>{label}</Text>
        </>
      )}
    </Pressable>
  );
};

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
