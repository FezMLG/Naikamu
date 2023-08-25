import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import {
  AuthStackRoutesNames,
  AuthStackVerifyEmailScreenProps,
} from '../../routes';
import { useUserStore } from '../../services/auth/user.store';
import { useTranslate } from '../../i18n/useTranslate';
import { globalStyle } from '../../styles';

export const VerifyEmailScreen = ({
  navigation,
}: AuthStackVerifyEmailScreenProps) => {
  const user = useUserStore(state => state.user);
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
        onPress={() => navigation.navigate(AuthStackRoutesNames.Login)}>
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