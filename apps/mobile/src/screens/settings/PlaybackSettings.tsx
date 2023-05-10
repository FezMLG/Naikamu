import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../../services/store/store';
import { useTranslate } from '../../i18n/useTranslate';
import { PlaybackSettingsScreenProps } from '../../routes/settings/interfaces';
import { Resolution } from '../../services/store/reducers/interfaces';
import { settingsService } from '../../services/settings/settings.service';

const PlaybackSettingsScreen = ({}: PlaybackSettingsScreenProps) => {
  const { userSettings } = useSelector(
    (state: RootState) => state.userSettings,
  );
  const dispatch = useAppDispatch();
  const { translate } = useTranslate();

  return (
    <SafeAreaView style={[styles.container]}>
      <RadioButton.Group
        onValueChange={newValue =>
          dispatch(
            settingsService.updateUserSettings({
              preferredResolution:
                Resolution[newValue as keyof typeof Resolution],
            }),
          )
        }
        value={userSettings?.preferredResolution ?? Resolution['1080p']}>
        {Object.keys(Resolution).map(key => {
          return (
            <View key={key}>
              <Text>{key}</Text>
              <RadioButton value={key} />
            </View>
          );
        })}
      </RadioButton.Group>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

export default PlaybackSettingsScreen;
