import React from 'react';
import { CastChromecast } from '../CastChromecast';
import { useQuery } from '@tanstack/react-query';
import { IconButton, Menu } from 'react-native-paper';

import GoogleCast from 'react-native-google-cast';
import { getVideoUrl } from '../../api/video/getVideoUrl';
import { AnimePlayer } from '../../interfaces';

export const PlayerMenu = ({ player }: { player: AnimePlayer }) => {
  const [visible, setVisible] = React.useState(false);
  const { data } = useQuery(
    ['anime', 'episode', player.player_link],
    () => getVideoUrl('cda', player.player_link),
    {
      retry: false,
    },
  );

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <IconButton icon="dots-horizontal" size={24} onPress={openMenu} />
      }>
      {data && <CastChromecast linkToMP4={data} />}
      <Menu.Item
        leadingIcon="remote"
        onPress={() => GoogleCast.showExpandedControls()}
        title="Cast Controls"
      />
    </Menu>
  );
};
