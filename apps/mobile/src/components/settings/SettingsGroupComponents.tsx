import React from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Switch as PaperSwitch } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  colors,
  DarkColor,
  defaultRadius,
  fontStyles,
  globalStyle,
} from '../../styles';

export function SettingsGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={groupStyles.container}>
      <Text style={[colors.textLight, globalStyle.marginBottomSmall]}>
        {title}
      </Text>
      {children}
    </View>
  );
}

const isFirstOrLast = (isFirst: boolean, isLast: boolean) => {
  if (isFirst && isLast) {
    return {
      ...groupStyles.radiusTop,
      ...groupStyles.radiusBottom,
    };
  } else if (isLast) {
    return groupStyles.radiusBottom;
  } else if (isFirst) {
    return groupStyles.radiusTop;
  }

  return {};
};

function Select({
  title,
  text,
  setIsModalOpen,
  isFirst = false,
  isLast = false,
}: {
  title: string;
  text: string;
  setIsModalOpen: (value: boolean) => void;
  isFirst?: boolean;
  isLast?: boolean;
}) {
  return (
    <Pressable
      onPress={() => setIsModalOpen(true)}
      style={[groupStyles.setting, isFirstOrLast(isFirst, isLast)]}>
      <Text style={[colors.textLight, fontStyles.headerSmall]}>{title}</Text>
      <View style={[styles.inline]}>
        <Text style={[colors.textLighter, fontStyles.text]}>{text}</Text>
        <Icon color={colors.textLighter.color} name="chevron-right" size={28} />
      </View>
    </Pressable>
  );
}

function Switch({
  text,
  isSwitchOn,
  setIsSwitchOn,
  isFirst = false,
  isLast = false,
}: {
  text: string;
  isSwitchOn: boolean;
  setIsSwitchOn: (value: boolean) => void;
  isFirst?: boolean;
  isLast?: boolean;
}) {
  return (
    <View style={[groupStyles.setting, isFirstOrLast(isFirst, isLast)]}>
      <Text style={[colors.textLight, fontStyles.headerSmall]}>{text}</Text>
      <PaperSwitch
        color={colors.accent.color}
        onValueChange={() => setIsSwitchOn(!isSwitchOn)}
        value={isSwitchOn}
      />
    </View>
  );
}

function Edit({
  label,
  text,
  onPress,
  isFirst = false,
  isLast = false,
}: {
  label: string;
  text: string;
  onPress: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[groupStyles.setting, isFirstOrLast(isFirst, isLast)]}>
      <View>
        <Text
          style={[
            colors.textLight,
            fontStyles.label,
            globalStyle.marginBottomSmall,
          ]}>
          {label}
        </Text>
        <Text style={[colors.textLight, fontStyles.headerSmall]}>{text}</Text>
      </View>
      <Icon color={colors.textLighter.color} name="pencil" size={28} />
    </Pressable>
  );
}

const groupStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderRadius: defaultRadius,
    width: '100%',
    margin: 16,
  },
  setting: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 80,
    backgroundColor: DarkColor.C800,
    paddingHorizontal: 10,
  },
  radiusTop: {
    borderTopLeftRadius: defaultRadius,
    borderTopRightRadius: defaultRadius,
  },
  radiusBottom: {
    borderBottomLeftRadius: defaultRadius,
    borderBottomRightRadius: defaultRadius,
  },
});

const styles = StyleSheet.create({
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});

export const SettingInputs = {
  Select,
  Switch,
  Edit,
};
