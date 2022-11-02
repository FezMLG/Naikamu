import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { AuthRoutesNames, VerifyEmailScreenProps } from '../routes/auth';
import { RootState } from '../services/store/store';
import { useTranslate } from '../i18n/useTranslate';
import { globalStyle } from '../styles/global.style';

const VerifyEmailScreen = ({ navigation }: VerifyEmailScreenProps) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { translate } = useTranslate();

  return (
    <SafeAreaView style={[styles.container]}>
      <Text variant="bodyMedium"> {translate('auth.email_verify.top')}</Text>
      <Text
        variant="bodyLarge"
        style={[globalStyle.spacerSmall, styles.highlight]}>
        {user?.email}
      </Text>
      <Text variant="bodyMedium"> {translate('auth.email_verify.bottom')}</Text>
      <Button
        style={globalStyle.marginTopBig}
        onPress={() => navigation.navigate(AuthRoutesNames.Login)}>
        {translate('buttons.go_back')}
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
  highlight: {
    fontWeight: 'bold',
  },
});

export default VerifyEmailScreen;
