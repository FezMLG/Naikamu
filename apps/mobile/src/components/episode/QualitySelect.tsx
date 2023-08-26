import React, { useState } from 'react';

import { StyleSheet, View } from 'react-native';
import { Checkbox, RadioButton, Text } from 'react-native-paper';

import { Button, Modal } from '../../components';
import { useTranslate } from '../../i18n/useTranslate';
import { Resolution } from '../../services/settings/interfaces';
import { useUserSettingsService } from '../../services/settings/settings.service';
import { colors, fontStyles } from '../../styles';

export function QualitySelect({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { userSettings, updateUserSettings } = useUserSettingsService();
  const { translate } = useTranslate();
  const [checked, setChecked] = useState(false);

  const handleQualityChange = (newValue: string) =>
    updateUserSettings({
      preferredResolution: newValue as Resolution,
    });

  return (
    <Modal.Container isOpen={isOpen} setIsOpen={setIsOpen}>
      <View style={styles.modalContent}>
        <Modal.Title title={translate('settings.modals.videoQuality')} />
        <RadioButton.Group
          onValueChange={handleQualityChange}
          value={userSettings?.preferredResolution ?? Resolution['1080p']}>
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
        <View style={[styles.inline, styles.checkboxContainer]}>
          <Checkbox
            onPress={() => {
              setChecked(!checked);
            }}
            status={checked ? 'checked' : 'unchecked'}
          />
          <View style={styles.radioLabel}>
            <Text style={[fontStyles.text, colors.textLight]}>
              Remember my choice
            </Text>
            <Text style={[fontStyles.label, colors.textLight]}>
              (can be changed later in app settings)
            </Text>
          </View>
        </View>
      </View>
      <Button icon="play" label="Play" type="primary" />
    </Modal.Container>
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
