import React from 'react';
import { IconButton, Menu } from 'react-native-paper';

import { AnimePlayer } from '../../interfaces';

export const PlayerMenu = ({ player }: { player: AnimePlayer }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <IconButton icon="dots-horizontal" size={24} onPress={openMenu} />
      }>
      {player.player_name === 'CDA' ? <></> : <></>}
    </Menu>
  );
};
