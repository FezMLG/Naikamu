import React from 'react';

import analytics from '@react-native-firebase/analytics';
import { Linking, Platform, View } from 'react-native';

import * as packageJson from '../../../package.json';
import { useQueryGetAppUpdate } from '../../api/hooks';
import { Alert } from '../molecules';
import { globalStyle } from '../../styles';

export type HomeUpdateAlertProps = Record<string, never>;

export const HomeUpdateAlert: React.FC<HomeUpdateAlertProps> = () => {
  const { data } = useQueryGetAppUpdate();

  return (
    <>
      {data && data.isUpdate ? (
        <View style={globalStyle.marginBottom}>
          <Alert
            message="A new update is available for the app. Click here to update."
            onPress={async () => {
              await analytics().logEvent('check_for_updates_home_button', {
                platform: Platform.OS,
                currentVersion: packageJson.version,
                newestVersion: data.data.tag_name,
              });

              Linking.openURL(data.data.assets.browser_download_url);
            }}
            title="New Update Available"
          />
        </View>
      ) : null}
    </>
  );
};
