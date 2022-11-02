import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { AuthRoutesNames, VerifyEmailScreenProps } from '../routes/auth';
import { RootState, useAppDispatch } from '../services/store/store';
import { fireGetUser } from '../services/firebase/fire-auth.service';
import { useTranslate } from '../i18n/useTranslate';

const VerifyEmailScreen = ({ navigation }: VerifyEmailScreenProps) => {
  const [loading, isLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const { translate } = useTranslate();

  const handleVerify = async () => {
    isLoading(true);
    await dispatch(fireGetUser());
    isLoading(false);
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <Text> {translate('auth.email_verify.top')}</Text>
      <Text>{user?.email}</Text>
      <Text> {translate('auth.email_verify.bottom')}</Text>
      <Button onPress={() => navigation.navigate(AuthRoutesNames.Login)}>
        Go Back
      </Button>
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
    maxWidth: 200,
    maxHeight: 200,
  },
});

export default VerifyEmailScreen;
