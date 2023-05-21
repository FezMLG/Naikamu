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
import { colors, darkColor, defaultRadius, fontStyles } from '../../styles';

export const SectionButton = ({
  title,
  onPress,
  icon,
  style,
}: {
  title: string;
  onPress: () => void;
  icon: string;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <View style={styles.titleContainer}>
        <Icon
          name={icon}
          size={24}
          color={colors.textLight.color}
          // style={styles.icon}
        />
        <Text style={[fontStyles.header, colors.textLight, styles.title]}>
          {title}
        </Text>
      </View>
      <Icon
        name={'chevron-right'}
        size={24}
        color={colors.textLight.color}
        // style={styles.icon}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: defaultRadius,
    backgroundColor: darkColor.C800,
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
