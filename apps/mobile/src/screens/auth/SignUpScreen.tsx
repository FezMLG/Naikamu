import React, { useState } from 'react';

import analytics from '@react-native-firebase/analytics';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Controller, useForm } from 'react-hook-form';
import { View, StyleSheet, Text } from 'react-native';
import * as RNLocalize from 'react-native-localize';

import {
  Button,
  useErrorHandler,
  PageLayout,
  TextInput,
} from '../../components';
import { useTranslate } from '../../i18n/useTranslate';
import { AuthStackRoutesNames, AuthStackSignUpScreenProps } from '../../routes';
import { useUserService } from '../../services/auth/user.service';
import { useLayoutMessageService } from '../../services/layout-info';
import { fontStyles, globalStyle } from '../../styles';

export interface SignUpForm {
  displayName: string;
  email: string;
  password: string;
  passwordAgain: string;
}

const ErrorText = () => {
  const { translate } = useTranslate();

  return (
    <Text style={[styles.errors, fontStyles.label]}>
      {translate('auth.required_field')}
    </Text>
  );
};

export function SignUpScreen({ navigation }: AuthStackSignUpScreenProps) {
  const { setAndShowMessage } = useLayoutMessageService();
  const [loading, isLoading] = useState(false);
  const { translate } = useTranslate();
  const userService = useUserService();
  const { errorResolver } = useErrorHandler();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      passwordAgain: '',
    },
  });

  const handleSignUp = async (data: SignUpForm) => {
    await analytics().logEvent('sign_up', {
      country: RNLocalize.getCountry(),
    });

    isLoading(true);
    try {
      if (data.password !== data.passwordAgain) {
        throw { code: 'auth/passwords-do-not-match' };
      }
      const user = await userService.registerUser(data);

      if (user) {
        navigation.navigate(AuthStackRoutesNames.VerifyEmail);
      }
    } catch (error: unknown) {
      const authError = error as FirebaseAuthTypes.NativeFirebaseAuthError;

      setAndShowMessage(translate(errorResolver(authError.code)));
    }
    isLoading(false);
  };

  return (
    <PageLayout.Default>
      <View style={[styles.formInputs, globalStyle.spacerBig]}>
        <Controller
          control={control}
          name="displayName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder={translate('auth.username')}
              style={[styles.textInput, globalStyle.marginTopSmall]}
              value={value}
            />
          )}
          rules={{
            required: true,
            maxLength: 100,
          }}
        />
        {errors.displayName && <ErrorText />}
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
              style={[styles.textInput, globalStyle.marginTopSmall]}
              value={value}
            />
          )}
          rules={{
            required: true,
            maxLength: 100,
          }}
        />
        {errors.email && <ErrorText />}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder={translate('auth.password')}
              secureTextEntry={true}
              style={[styles.textInput, globalStyle.marginTopSmall]}
              value={value}
            />
          )}
          rules={{
            required: true,
            maxLength: 100,
          }}
        />
        {errors.password && <ErrorText />}
        <Controller
          control={control}
          name="passwordAgain"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder={translate('auth.password_again')}
              secureTextEntry={true}
              style={[styles.textInput, globalStyle.marginTopSmall]}
              value={value}
            />
          )}
          rules={{
            required: true,
            maxLength: 100,
          }}
        />
        {errors.passwordAgain && <ErrorText />}
        <Button
          disabled={loading}
          label={translate('auth.register')}
          loading={loading}
          onPress={handleSubmit(handleSignUp)}
          style={[globalStyle.marginTopBig]}
          type="primary"
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
  textInput: {},
  formInputs: {
    alignItems: 'center',
  },
  errors: {
    color: '#CF6679',
  },
});
