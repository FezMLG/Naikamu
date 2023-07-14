import React from 'react';
import { Menu } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AnimePlayer } from '@aniwatch/shared';
import { Linking, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../styles';

export const PlayerMenu = ({ player }: { player: AnimePlayer }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchorPosition={'bottom'}
      anchor={
        <Pressable
          onPress={openMenu}
          android_ripple={{ color: '#fffff', radius: 20 }}
          style={{
            height: 48,
            width: 48,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="dots-horizontal" size={30} style={colors.textLight} />
        </Pressable>
      }>
      <Pressable
        onPress={() => Linking.openURL(player.source_url)}
        android_ripple={{ color: '#fffff', radius: 20 }}
        style={styles.menuItem}>
        <Text>Source Page</Text>
      </Pressable>
    </Menu>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
