import React from 'react';

import { AnimePlayer } from '@naikamu/shared';
import { Linking, Pressable, StyleSheet, Text } from 'react-native';
import { Menu } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors, fontStyles } from '../../styles';

export function PlayerMenu({ player }: { player: AnimePlayer }) {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Menu
      anchor={
        <Pressable
          android_ripple={{ color: '#fffff', radius: 20 }}
          onPress={openMenu}
          style={{
            height: 48,
            width: 48,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="dots-horizontal" size={30} style={colors.textLight} />
        </Pressable>
      }
      anchorPosition="bottom"
      onDismiss={closeMenu}
      visible={visible}>
      <Pressable
        android_ripple={{ color: '#fffff', radius: 20 }}
        onPress={() => Linking.openURL(player.source_url)}
        style={styles.menuItem}>
        <Text style={[colors.textLight, fontStyles.text]}>Source Page</Text>
      </Pressable>
    </Menu>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
