import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, RadioButton, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../../services/store/store';
import { useTranslate } from '../../i18n/useTranslate';
import { globalStyle } from '../../styles/global.style';
import { fireLogoutUser } from '../../services/firebase/fire-auth.service';
import { PlaybackSettingsScreenProps } from '../../routes/settings/interfaces';
import { ENV, API_URL } from '@env';
import { Resolution } from '../../services/store/reducers/interfaces';
import { settingsService } from '../../services/settings/settings.service';

const PlaybackSettingsScreen = ({
  navigation,
}: PlaybackSettingsScreenProps) => {
  const [value, setValue] = useState<string>('1080p');

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
              preferredResolution: newValue as Resolution,
            }),
          )
        }
        value={userSettings?.preferredResolution ?? '1080p'}>
        <View>
          <Text>1080p</Text>
          <RadioButton value="1080p" />
        </View>
        <View>
          <Text>720p</Text>
          <RadioButton value="720p" />
        </View>
        <View>
          <Text>480p</Text>
          <RadioButton value="480p" />
        </View>
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
