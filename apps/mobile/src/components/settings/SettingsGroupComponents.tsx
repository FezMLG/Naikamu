import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  colors,
  darkColor,
  defaultRadius,
  fontStyles,
  globalStyle,
} from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Switch as PaperSwitch } from 'react-native-paper';

export const SettingsGroup = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <View style={groupStyles.container}>
      <Text style={[globalStyle.marginBottomSmall]}>{title}</Text>
      {children}
    </View>
  );
};

const isFirstOrLast = (isFirst: boolean, isLast: boolean) => {
  if (isFirst) {
    return groupStyles.radiusTop;
  } else if (isLast) {
    return groupStyles.radiusBottom;
  } else {
    return {};
  }
};

const Select = ({
  text,
  setIsModalOpen,
  isFirst = false,
  isLast = false,
}: {
  text: string;
  setIsModalOpen: (value: boolean) => void;
  isFirst?: boolean;
  isLast?: boolean;
}) => {
  return (
    <Pressable
      onPress={() => setIsModalOpen(true)}
      style={[groupStyles.setting, isFirstOrLast(isFirst, isLast)]}>
      <Text style={[colors.textLight, fontStyles.headerSmall]}>
        Default quality
      </Text>
      <View style={[styles.inline]}>
        <Text style={[colors.textLighter, fontStyles.text]}>{text}</Text>
        <Icon
          name={'chevron-right'}
          size={28}
          color={colors.textLighter.color}
        />
      </View>
    </Pressable>
  );
};

const Switch = ({
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
}) => {
  return (
    <View style={[groupStyles.setting, isFirstOrLast(isFirst, isLast)]}>
      <Text style={[colors.textLight, fontStyles.headerSmall]}>{text}</Text>
      <PaperSwitch
        value={isSwitchOn}
        onValueChange={() => setIsSwitchOn(!isSwitchOn)}
        color={colors.accent.color}
      />
    </View>
  );
};

const Edit = ({
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
}) => {
  return (
    <Pressable
      style={[groupStyles.setting, isFirstOrLast(isFirst, isLast)]}
      onPress={onPress}>
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
      <Icon name={'pencil'} size={28} color={colors.textLighter.color} />
    </Pressable>
  );
};

const groupStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderRadius: defaultRadius,
    width: '100%',
    margin: 16,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 80,
    backgroundColor: darkColor.C800,
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
