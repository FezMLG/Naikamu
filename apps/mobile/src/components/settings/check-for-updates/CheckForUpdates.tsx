import React, { useState } from 'react';

import { Linking, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import semver from 'semver';

import * as packageJson from '../../../../package.json';
import { apiClient } from '../../../api/APIClient';
import { useTranslate } from '../../../i18n/useTranslate';
import { colors, fontStyles, globalStyle } from '../../../styles';
import { Button, Modal } from '../../atoms';

export const CheckForUpdates = () => {
  const { translate } = useTranslate();
  const [isChecking, setIsChecking] = useState(false);
  const [updateText, setUpdateText] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [updateData, setUpdateData] = useState<{
    tag_name: string;
    assets: { name: string; browser_download_url: string };
  }>();

  return (
    <>
      <Button
        icon="update"
        label={translate('settings.checkForUpdates')}
        loading={isChecking}
        onPress={async () => {
          setIsChecking(() => true);
          const update = await apiClient.checkForUpdates();

          const currentOsUpdate = update.assets.find(a => {
            const android = /^naikamu-\d+\.\d+\.\d+.apk/;
            const ios = /^Naikamu-\d+\.\d+\.\d+.ipa/;

            if (Platform.OS === 'android') {
              return android.test(a.name);
            } else if (Platform.OS === 'ios') {
              return ios.test(a.name);
            }
          });

          if (!currentOsUpdate) {
            throw new Error('Unsupported platform');
          }

          setUpdateData(() => ({
            tag_name: update.tag_name,
            assets: currentOsUpdate,
          }));

          if (semver.gt(update.tag_name, packageJson.version)) {
            setIsOpen(() => true);
          } else {
            setUpdateText('settings.noUpdates');
            setTimeout(() => {
              setUpdateText(() => null);
            }, 5000);
          }

          setIsChecking(() => false);
        }}
        type="secondary"
      />
      {updateText && (
        <Text
          style={[
            globalStyle.textCenter,
            globalStyle.marginTopSmall,
            fontStyles.normal,
            colors.textLight,
          ]}>
          {translate(updateText)}
        </Text>
      )}
      <Modal.Container isOpen={isOpen} setIsOpen={setIsOpen}>
        <Modal.Title title={translate('settings.updateAvailable.title')} />
        <Text
          style={[
            fontStyles.normal,
            colors.textLight,
            globalStyle.marginTopSmall,
          ]}>
          {translate('settings.updateAvailable.description', {
            current: packageJson.version,
            new: updateData?.tag_name,
          })}
        </Text>
        <Button
          label={translate('settings.updateAvailable.update')}
          onPress={() => {
            if (updateData?.assets) {
              Linking.openURL(updateData.assets.browser_download_url);
            }
          }}
          size="small"
          style={[globalStyle.marginTop]}
          type="primary"
        />
        <Button
          label={translate('settings.updateAvailable.later')}
          onPress={() => {
            setIsOpen(() => false);
          }}
          size="small"
          style={[globalStyle.marginTopSmall]}
          type="secondary"
        />
      </Modal.Container>
    </>
  );
};
