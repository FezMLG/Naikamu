import React, { useState } from 'react';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { default as Config } from 'react-native-config';
import { RadioButton } from 'react-native-paper';

import { Button, Modal, SettingInputs, SettingsGroup } from '../../components';
import { useTranslate } from '../../i18n/useTranslate';
import { SettingsStackPlaybackSettingsScreenProps } from '../../routes';
import { useOfflineService } from '../../services';
import { useDownloadsQueueStore } from '../../services/offline/queue.store';
import { Resolution } from '../../services/settings/interfaces';
import { useUserSettingsService } from '../../services/settings/settings.service';
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
              style={[fontStyles.text, colors.textLight, styles.radioLabel]}>
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
  const {
    userSettings: { preferredResolution, preferredDownloadQuality },
  } = useUserSettingsService();
  const [playbackQuality, setPlaybackQuality] =
    useState<string>(preferredResolution);
  const [downloadQuality, setDownloadQuality] = useState<string>(
    preferredDownloadQuality,
  );
  const { updateUserSettings, userSettings } = useUserSettingsService();
  const { clearOffline } = useOfflineService();
  const queueActions = useDownloadsQueueStore(state => state.actions);

  const { translate } = useTranslate();
  const [isOpenP, setIsOpenP] = useState(false);
  const [isOpenQ, setIsOpenQ] = useState(false);

  const handlePlaybackQualityChange = async (newResolution: Resolution) => {
    await updateUserSettings({ preferredResolution: newResolution });
    setIsOpenP(false);
  };

  const handleDownloadQualityChange = async (newResolution: Resolution) => {
    await updateUserSettings({ preferredDownloadQuality: newResolution });
    setIsOpenQ(false);
  };

  return (
    <SafeAreaView style={[styles.container]}>
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
      <View style={globalStyle.marginTop}>
        <Text style={[fontStyles.label, colors.textLight]}>Environment</Text>
        <Text style={[fontStyles.text, colors.textLighter]}>{Config.ENV}</Text>
        <Text
          style={[
            fontStyles.label,
            colors.textLight,
            globalStyle.marginTopSmall,
          ]}>
          API Endpoint
        </Text>
        <Text style={[fontStyles.text, colors.textLighter]}>
          {Config.API_URL}
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
            <Text style={[fontStyles.text, colors.textLighter]}>
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
    </SafeAreaView>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
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
