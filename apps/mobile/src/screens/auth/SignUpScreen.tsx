import React, { useState } from 'react';

import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Controller, useForm } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

import {
  Button,
  useLayout,
  useErrorHandler,
  PageLayout,
} from '../../components';
import { useTranslate } from '../../i18n/useTranslate';
import { AuthStackRoutesNames, AuthStackSignUpScreenProps } from '../../routes';
import { useUserService } from '../../services/auth/user.service';
import { globalStyle } from '../../styles';

export interface SignUpForm {
  displayName: string;
  email: string;
  password: string;
  passwordAgain: string;
}

export function SignUpScreen({ navigation }: AuthStackSignUpScreenProps) {
  const layout = useLayout();
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

      layout.setInfo(translate(errorResolver(authError.code)));
      layout.setVisible(true);
    }
    isLoading(false);
  };

  return (
    <PageLayout.Default {...layout}>
      <View style={[styles.formInputs, globalStyle.spacerBig]}>
        <Controller
          control={control}
          name="displayName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder={translate('auth.username')}
              style={[
                styles.textInput,
                styles.width90,
                globalStyle.marginTopSmall,
              ]}
              value={value}
            />
          )}
          rules={{
            required: true,
            maxLength: 100,
          }}
        />
        {errors.displayName && (
          <Text style={styles.errors}>{translate('auth.required_field')}</Text>
        )}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Email"
              style={[
                styles.textInput,
                styles.width90,
                globalStyle.marginTopSmall,
              ]}
              value={value}
            />
          )}
          rules={{
            required: true,
            maxLength: 100,
          }}
        />
        {errors.email && (
          <Text style={styles.errors}>{translate('auth.required_field')}</Text>
        )}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              autoCapitalize="none"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder={translate('auth.password')}
              secureTextEntry={true}
              style={[
                styles.textInput,
                styles.width90,
                globalStyle.marginTopSmall,
              ]}
              value={value}
            />
          )}
          rules={{
            required: true,
            maxLength: 100,
          }}
        />
        {errors.password && (
          <Text style={styles.errors}>{translate('auth.required_field')}</Text>
        )}
        <Controller
          control={control}
          name="passwordAgain"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              autoCapitalize="none"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder={translate('auth.password_again')}
              secureTextEntry={true}
              style={[
                styles.textInput,
                styles.width90,
                globalStyle.marginTopSmall,
              ]}
              value={value}
            />
          )}
          rules={{
            required: true,
            maxLength: 100,
          }}
        />
        {errors.passwordAgain && (
          <Text style={styles.errors}>{translate('auth.required_field')}</Text>
        )}
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
  width90: {
    maxWidth: 500,
    width: '90%',
    minWidth: 10,
  },
});
