import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../../services/store/store';
import { useTranslate } from '../../i18n/useTranslate';
import { PlaybackSettingsScreenProps } from '../../routes/settings/interfaces';
import { Resolution } from '../../services/store/reducers/interfaces';
import { settingsService } from '../../services/settings/settings.service';
import {
  colors,
  darkColor,
  defaultRadius,
  fontStyles,
  globalStyle,
} from '../../styles';
import Config from 'react-native-config';
import { Button, Modal, SettingInputs, SettingsGroup } from '../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Switch } from 'react-native-paper';

const QualityModal = ({
  isOpen,
  setIsOpen,
  quality,
  setQuality,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  quality: string;
  setQuality: (quality: string) => void;
}) => {
  const dispatch = useAppDispatch();
  const { translate } = useTranslate();

  const handleQualityChange = (newResolution: Resolution) => {
    dispatch(
      settingsService.updateUserSettings({
        preferredResolution: newResolution,
      }),
    );
    setIsOpen(false);
  };

  return (
    <Modal.Container isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Title title="Select quality" />
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
        label={'Save'}
        type={'primary'}
        icon={'play'}
        onPress={() => handleQualityChange(quality as Resolution)}
      />
    </Modal.Container>
  );
};

const AppSettingsScreen = ({}: PlaybackSettingsScreenProps) => {
  const { userSettings } = useSelector(
    (state: RootState) => state.userSettings,
  );
  const [quality, setQuality] = useState<string>(
    userSettings?.preferredResolution ?? Resolution['1080p'],
  );

  const { translate } = useTranslate();
  const [isOpen, setIsOpen] = useState(false);

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  return (
    <SafeAreaView style={[styles.container]}>
      <QualityModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        quality={quality}
        setQuality={setQuality}
      />
      <SettingsGroup title={'Video Playback'}>
        <SettingInputs.Select
          text={quality ?? '1080p'}
          setIsModalOpen={setIsOpen}
          isFirst={true}
        />
        <SettingInputs.Switch
          isSwitchOn={isSwitchOn}
          setIsSwitchOn={setIsSwitchOn}
          text={'aaa'}
        />
        <SettingInputs.Edit
          label={'password'}
          isSwitchOn={isSwitchOn}
          setIsSwitchOn={setIsSwitchOn}
          text={'*'.repeat(10)}
        />
        <SettingInputs.Edit
          label={'email'}
          isSwitchOn={isSwitchOn}
          setIsSwitchOn={setIsSwitchOn}
          text={'example@gmail.com'}
          isLast={true}
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
      </View>
    </SafeAreaView>
  );
};

const groupStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderRadius: defaultRadius,
    width: '100%',
    margin: 16,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 80,
    backgroundColor: darkColor.C800,
    paddingHorizontal: 10,
  },
  radiusTop: {
    borderTopLeftRadius: defaultRadius,
    borderTopRightRadius: defaultRadius,
  },
  radiusBottom: {
    borderBottomLeftRadius: defaultRadius,
    borderBottomRightRadius: defaultRadius,
  },
});

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

export default AppSettingsScreen;
