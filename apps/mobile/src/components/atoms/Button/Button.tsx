import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
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
  let textStyle = colors.textLight;
  let buttonColor = colors.accent;
  let buttonBorder = { ...styles.borderBase, borderColor: 'transparent' };
  switch (type) {
    case 'secondary':
      textStyle = colors.textDark;
      buttonColor = colors.onBackground;
      break;
    case 'warning':
      textStyle = colors.textLight;
      buttonColor = colors.transparent;
      buttonBorder.borderColor = colors.error.color;
      break;
    case 'link':
      textStyle = colors.textLight;
      buttonColor = colors.transparent;
      break;
  }

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: buttonColor.color },
        ...style,
        buttonBorder,
      ]}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator visible={loading} />
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
