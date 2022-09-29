import React from 'react';
import { CastChromecast } from '../CastChromecast';
import GoogleCast from 'react-native-google-cast';
import { getVideoUrl } from '../../api/video/getVideoUrl';
import { useQuery } from '@tanstack/react-query';
import { LinkElement } from './interfaces';
import { Button, Menu } from 'react-native-paper';

export const PlayerMenu = ({ player }: { player: LinkElement }) => {
  const [visible, setVisible] = React.useState(false);
  const { data } = useQuery(['aaaa'], () => getVideoUrl('cda', player.link), {
    retry: false,
  });

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Button onPress={openMenu}>Options</Button>}>
      {data && <CastChromecast linkToMP4={data} />}
      <Menu.Item
        leadingIcon="remote"
        onPress={() => GoogleCast.showExpandedControls()}
        title="Cast Controls"
      />
    </Menu>
  );
};
