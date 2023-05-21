import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../../services/store/store';
import { useTranslate } from '../../i18n/useTranslate';
import { PlaybackSettingsScreenProps } from '../../routes/settings/interfaces';
import { Resolution } from '../../services/store/reducers/interfaces';
import { settingsService } from '../../services/settings/settings.service';
import { colors, fontStyles } from '../../styles';

const AppSettingsScreen = ({}: PlaybackSettingsScreenProps) => {
  const { userSettings } = useSelector(
    (state: RootState) => state.userSettings,
  );
  const dispatch = useAppDispatch();
  const { translate } = useTranslate();

  const handleQualityChange = (newValue: string) =>
    dispatch(
      settingsService.updateUserSettings({
        preferredResolution: newValue as Resolution,
      }),
    );

  return (
    <SafeAreaView style={[styles.container]}>
      <RadioButton.Group
        onValueChange={handleQualityChange}
        value={userSettings?.preferredResolution ?? Resolution['1080p']}>
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
