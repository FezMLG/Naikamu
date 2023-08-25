import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Config from 'react-native-config';

import { useTranslate } from '../../i18n/useTranslate';
import { Resolution } from '../../services/settings/interfaces';
import { colors, fontStyles, globalStyle } from '../../styles';
import { Button, Modal, SettingInputs, SettingsGroup } from '../../components';
import { useUserSettingsService } from '../../services/settings/settings.service';
import { useOfflineService } from '../../services';
import { useDownloadsQueueStore } from '../../services/offline/queue.store';
import { SettingsStackPlaybackSettingsScreenProps } from '../../routes';

const QualityModal = ({
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
}) => {
  const { translate } = useTranslate();

  return (
    <Modal.Container isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Title title={translate('settings.modals.videoQuality')} />
      <RadioButton.Group onValueChange={setQuality} value={quality}>
        {Object.keys(Resolution).map(key => {
          return (
            <View key={key} style={[styles.inline, styles.radioContainer]}>
              <RadioButton value={key} />
              <Text
                style={[fontStyles.text, colors.textLight, styles.radioLabel]}>
                {Resolution[key as keyof typeof Resolution]}
              </Text>
            </View>
          );
        })}
      </RadioButton.Group>
      <Button
        label={translate('forms.save')}
        type={'primary'}
        onPress={() => handleChange(quality as Resolution)}
      />
    </Modal.Container>
  );
};

export const AppSettingsScreen =
  ({}: SettingsStackPlaybackSettingsScreenProps) => {
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
          isOpen={isOpenP}
          setIsOpen={setIsOpenP}
          quality={playbackQuality}
          setQuality={setPlaybackQuality}
          handleChange={handlePlaybackQualityChange}
        />
        <QualityModal
          isOpen={isOpenQ}
          setIsOpen={setIsOpenQ}
          quality={downloadQuality}
          setQuality={setDownloadQuality}
          handleChange={handleDownloadQualityChange}
        />
        <SettingsGroup
          title={translate('settings.groups.videoPlaybackDownload')}>
          <SettingInputs.Select
            title={translate('settings.titles.videoQuality')}
            text={playbackQuality ?? '1080p'}
            setIsModalOpen={setIsOpenP}
            isFirst={true}
            isLast={true}
          />
        </SettingsGroup>
        {/* <SettingsGroup title={translate('settings.groups.videoDownload')}>
        <SettingInputs.Select
          title={translate('settings.titles.videoQuality')}
          text={downloadQuality ?? '1080p'}
          setIsModalOpen={setIsOpenQ}
          isFirst={true}
          isLast={true}
        />
      </SettingsGroup> */}
        <View style={globalStyle.marginTop}>
          <Text style={[fontStyles.label, colors.textLight]}>Environment</Text>
          <Text style={[fontStyles.text, colors.textLighter]}>
            {Config.ENV}
          </Text>
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
          {Config.ENV === 'dev' && (
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
            </>
          )}
          <Button
            label={'Clear downloads'}
            type={'primary'}
            onPress={() => {
              clearOffline();
            }}
          />
          <Button
            label={'Clear downloads queue'}
            type={'primary'}
            onPress={() => {
              queueActions.clearQueue();
            }}
          />
        </View>
      </SafeAreaView>
    );
  };

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
