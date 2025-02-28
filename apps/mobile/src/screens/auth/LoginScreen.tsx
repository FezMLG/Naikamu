import React, { useState } from 'react';

import { getAnalytics } from '@react-native-firebase/analytics';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useForm, Controller } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import { Text } from 'react-native-paper';

import {
  useErrorHandler,
  PageLayout,
  Button,
  TextInput,
} from '../../components';
import { useTranslate } from '../../i18n/useTranslate';
import { AuthStackLoginScreenProps, AuthStackRoutesNames } from '../../routes';
import { useUserService } from '../../services/auth/user.service';
import { useUserStore } from '../../services/auth/user.store';
import { useLayoutMessageService } from '../../services/layout-info';
import { globalStyle } from '../../styles';
import { logger } from '../../utils';

export interface LoginForm {
  email: string;
  password: string;
}

export function LoginScreen({ navigation }: AuthStackLoginScreenProps) {
  const userService = useUserService();
  const { setAndShowMessage } = useLayoutMessageService();
  const [loading, isLoading] = useState(false);
  const { translate } = useTranslate();
  const userActions = useUserStore(state => state.actions);
  const { errorResolver } = useErrorHandler();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (data: LoginForm) => {
    await getAnalytics().logEvent('login', {
      country: RNLocalize.getCountry(),
    });

    isLoading(true);
    try {
      await userService.loginUser(data);
      isLoading(false);
      const user = userActions.getUser();

      if (user && !user.emailVerified) {
        try {
          navigation.navigate(AuthStackRoutesNames.VerifyEmail);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error: unknown) {
      const authError = error as FirebaseAuthTypes.NativeFirebaseAuthError;

      logger('handleLogin').warn(error);
      setAndShowMessage(translate(errorResolver(authError.code)));
    }
    isLoading(false);
  };

  return (
    <PageLayout.Default>
      <View style={[styles.formInputs, globalStyle.spacerBig]}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Email"
              style={[globalStyle.marginTop]}
              value={value}
            />
          )}
          rules={{
            required: true,
            maxLength: 100,
          }}
        />
        {errors.email && (
          <Text style={globalStyle.errors}>
            {translate('auth.required_field')}
          </Text>
        )}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder={translate('auth.password')}
              secureTextEntry={true}
              style={[globalStyle.marginTopSmall]}
              value={value}
            />
          )}
          rules={{
            required: true,
            maxLength: 100,
          }}
        />
        {errors.password && (
          <Text style={globalStyle.errors}>
            {translate('auth.required_field')}
          </Text>
        )}
        <Button
          disabled={loading}
          label={translate('auth.login')}
          loading={loading}
          onPress={handleSubmit(handleLogin)}
          style={[globalStyle.marginTopBig]}
          type="primary"
        />
        <Button
          disabled={loading}
          label={translate('auth.forgot_password')}
          onPress={() =>
            navigation.navigate(AuthStackRoutesNames.ForgotPassword)
          }
          style={[globalStyle.marginTopSmall]}
          type="link"
        />
      </View>
    </PageLayout.Default>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
  formInputs: {
    alignItems: 'center',
  },
  width90: {
    maxWidth: 500,
    width: '100%',
    minWidth: 10,
  },
});
