import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { useAppDispatch } from '../../services/store/store';
import { useTranslate } from '../../i18n/useTranslate';
import { globalStyle } from '../../styles/global.style';
import {
  fireDeleteAccount,
  fireLogoutUser,
} from '../../services/firebase/fire-auth.service';
import { ActionType } from '@aniwatch/shared';
import {
  SettingsScreenNames,
  SettingsStackParamList,
} from '../../routes/settings/interfaces';
import { Button } from '../../components';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const AccountDelete = () => {
  const dispatch = useAppDispatch();
  const { translate } = useTranslate();
  const navigation = useNavigation<NavigationProp<SettingsStackParamList>>();

  const handleAccountDelete = async () => {
    try {
      await dispatch(fireDeleteAccount());
    } catch (error: any) {
      if (error.code === 'auth/requires-recent-login') {
        await dispatch(fireLogoutUser());
      } else {
        console.error(error);
      }
    }
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <Button
        label={translate('auth.delete_account')}
        type={'warning'}
        style={[styles.center, globalStyle.marginTopBig]}
        onPress={() =>
          navigation.navigate(SettingsScreenNames.SettingsActionConfirm, {
            action: () => {
              handleAccountDelete();
            },
            type: ActionType.AccountDelete,
          })
        }
      />
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

export default AccountDelete;
