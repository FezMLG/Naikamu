import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { default as Config } from 'react-native-config';
import { RadioButton } from 'react-native-paper';

import * as packageJson from '../../../package.json';
import {
  Button,
  Modal,
  PageLayout,
  SectionButton,
  SettingInputs,
  SettingsGroup,
  useLayout,
} from '../../components';
import { useTranslate } from '../../i18n/useTranslate';
import { SettingsStackPlaybackSettingsScreenProps } from '../../routes';
import {
  useOfflineService,
  useUserSettingsService,
  Resolution,
  useNotificationService,
} from '../../services';
import { useDownloadsQueueStore } from '../../services/offline/queue.store';
import { colors, fontStyles, globalStyle } from '../../styles';

function QualityModal({
  isOpen,
  setIsOpen,
  quality,
  setQuality,
  handleChange,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  quality: string;
  setQuality: (quality: string) => void;
  handleChange: (quality: Resolution) => void;
}) {
  const { translate } = useTranslate();

  return (
    <Modal.Container isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Title title={translate('settings.modals.videoQuality')} />
      <RadioButton.Group onValueChange={setQuality} value={quality}>
        {Object.keys(Resolution).map(key => (
          <View key={key} style={[styles.inline, styles.radioContainer]}>
            <RadioButton value={key} />
            <Text
              style={[
                fontStyles.paragraph,
                colors.textLight,
                styles.radioLabel,
              ]}>
              {Resolution[key as keyof typeof Resolution]}
            </Text>
          </View>
        ))}
      </RadioButton.Group>
      <Button
        label={translate('forms.save')}
        onPress={() => handleChange(quality as Resolution)}
        type="primary"
      />
    </Modal.Container>
  );
}

export function AppSettingsScreen({}: SettingsStackPlaybackSettingsScreenProps) {
  const { updateUserSettings, userSettings, updateUserNotificationSettings } =
    useUserSettingsService();

  const notificationService = useNotificationService();

  const [playbackQuality, setPlaybackQuality] = useState<string>(
    userSettings.preferredResolution,
  );
  const [downloadQuality, setDownloadQuality] = useState<string>(
    userSettings.preferredDownloadQuality,
  );
  const { clearOffline } = useOfflineService();
  const queueActions = useDownloadsQueueStore(state => state.actions);

  const { translate } = useTranslate();
  const [isOpenP, setIsOpenP] = useState(false);
  const [isOpenQ, setIsOpenQ] = useState(false);

  const handlePlaybackQualityChange = (newResolution: Resolution) => {
    updateUserSettings({ preferredResolution: newResolution });
    setIsOpenP(false);
  };

  const handleDownloadQualityChange = (newResolution: Resolution) => {
    updateUserSettings({ preferredDownloadQuality: newResolution });
    setIsOpenQ(false);
  };

  const layout = useLayout();

  return (
    <PageLayout.Default {...layout}>
      <QualityModal
        handleChange={handlePlaybackQualityChange}
        isOpen={isOpenP}
        quality={playbackQuality}
        setIsOpen={setIsOpenP}
        setQuality={setPlaybackQuality}
      />
      <QualityModal
        handleChange={handleDownloadQualityChange}
        isOpen={isOpenQ}
        quality={downloadQuality}
        setIsOpen={setIsOpenQ}
        setQuality={setDownloadQuality}
      />
      <SettingsGroup title={translate('settings.groups.videoPlayback')}>
        <SettingInputs.Select
          isFirst={true}
          isLast={true}
          setIsModalOpen={setIsOpenP}
          text={playbackQuality ?? '1080p'}
          title={translate('settings.titles.videoQuality')}
        />
      </SettingsGroup>
      <SettingsGroup title={translate('settings.groups.videoDownload')}>
        <SettingInputs.Select
          isFirst={true}
          isLast={true}
          setIsModalOpen={setIsOpenQ}
          text={downloadQuality ?? '1080p'}
          title={translate('settings.titles.videoQuality')}
        />
      </SettingsGroup>
      <SettingsGroup title={translate('settings.groups.notifications')}>
        <SectionButton
          onPress={async () => {
            await notificationService.openDeviceNotificationSettings();
          }}
          title={translate('settings.openAppNotificationSettings')}
        />
      </SettingsGroup>
      <View style={globalStyle.marginTop}>
        <Text style={[fontStyles.label, colors.textLight]}>Environment</Text>
        <Text style={[fontStyles.paragraph, colors.textLighter]}>
          {JSON.stringify(Config)}
        </Text>
        <Text
          style={[
            fontStyles.label,
            colors.textLight,
            globalStyle.marginTopSmall,
          ]}>
          API Endpoint
        </Text>
        <Text style={[fontStyles.paragraph, colors.textLighter]}>
          {Config.API_URL}
        </Text>
        <Text
          style={[
            fontStyles.label,
            colors.textLight,
            globalStyle.marginTopSmall,
          ]}>
          API Version
        </Text>
        <Text style={[fontStyles.paragraph, colors.textLighter]}>
          {packageJson.apiVersion}
        </Text>
        <Text
          style={[
            fontStyles.label,
            colors.textLight,
            globalStyle.marginTopSmall,
          ]}>
          APP Version
        </Text>
        <Text style={[fontStyles.paragraph, colors.textLighter]}>
          {packageJson.version} ({packageJson.codeVersion})
        </Text>
        {Config.ENV === 'development' && (
          <>
            <Text
              style={[
                fontStyles.label,
                colors.textLight,
                globalStyle.marginTopSmall,
              ]}>
              User Settings
            </Text>
            <Text style={[fontStyles.paragraph, colors.textLighter]}>
              {JSON.stringify(userSettings)}
            </Text>
            <Button
              label="Clear downloads"
              onPress={() => {
                clearOffline();
              }}
              type="primary"
            />
            <Button
              label="Clear downloads queue"
              onPress={() => {
                queueActions.clearQueue();
              }}
              type="primary"
            />
          </>
        )}
      </View>
    </PageLayout.Default>
  );
}

const styles = StyleSheet.create({
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContent: {
    padding: 10,
  },
  checkboxContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  container: {
    marginTop: 16,
  },
  radioContainer: {
    marginVertical: 10,
  },
  radioLabel: {
    marginLeft: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
    resizeMode: 'cover',
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  highlight: {
    fontWeight: 'bold',
  },
  center: {
    alignSelf: 'center',
  },
  textInput: {},
  formInputs: {
    alignItems: 'center',
  },
  width90: {
    maxWidth: 500,
    width: '90%',
    minWidth: 10,
  },
  textCenter: {
    textAlign: 'center',
  },
});
