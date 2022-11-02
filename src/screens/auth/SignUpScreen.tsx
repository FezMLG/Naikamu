import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useTranslate } from '../../i18n/useTranslate';

import { AuthRoutesNames, SignUpScreenProps } from '../../routes/auth';
import { fireRegisterUser } from '../../services/firebase/fire-auth.service';
import { RootState, useAppDispatch } from '../../services/store/store';
import { globalStyle } from '../../styles/global.style';

interface SignUpUser {
  displayName: string;
  email: string;
  password: string;
  passwordAgain: string;
}

export const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  const [loading, isLoading] = useState(false);
  const [authError, setAuthError] = useState<null | string>(null);
  const dispatch = useAppDispatch();
  const { translate } = useTranslate();
  const { user } = useSelector((state: RootState) => state.user);

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

  const handleSignUp = async (data: SignUpUser) => {
    isLoading(true);
    try {
      if (data.password !== data.passwordAgain) {
        throw { code: 'auth/passwords-do-not-match' };
      }
      await dispatch(
        fireRegisterUser(data.displayName, data.email, data.password),
      );
      if (user) {
        navigation.navigate(AuthRoutesNames.VerifyEmail);
      }
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/invalid-email') {
        setAuthError(translate('auth.errors.invalid_email'));
      } else if (error.code === 'auth/email-already-in-use') {
        setAuthError(translate('auth.errors.email_already_in_use'));
      } else if (error.code === 'auth/passwords-do-not-match') {
        setAuthError(translate('auth.errors.passwords_do_not_match'));
      } else if (error.code === 'auth/weak-password') {
        setAuthError(translate('auth.errors.weak_password'));
      } else {
        console.error(error);
        setAuthError(translate('auth.errors.unknown'));
      }
    }
    isLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.formInputs, globalStyle.spacerBig]}>
        {authError && <Text style={globalStyle.errors}>{authError}</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              placeholder={translate('auth.username')}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="none"
              autoCorrect={false}
              style={[
                styles.textInput,
                styles.width90,
                globalStyle.marginTopSmall,
              ]}
              mode={'outlined'}
            />
          )}
          name="displayName"
        />
        {errors.displayName && (
          <Text style={styles.errors}>{translate('auth.required_field')}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              placeholder={'Email'}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              style={[
                styles.textInput,
                styles.width90,
                globalStyle.marginTopSmall,
              ]}
              mode={'outlined'}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={styles.errors}>{translate('auth.required_field')}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onBlur={onBlur}
              placeholder={translate('auth.password')}
              onChangeText={onChange}
              autoCapitalize="none"
              secureTextEntry={true}
              style={[
                styles.textInput,
                styles.width90,
                globalStyle.marginTopSmall,
              ]}
              mode={'outlined'}
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={styles.errors}>{translate('auth.required_field')}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onBlur={onBlur}
              placeholder={translate('auth.password_again')}
              onChangeText={onChange}
              autoCapitalize="none"
              secureTextEntry={true}
              style={[
                styles.textInput,
                styles.width90,
                globalStyle.marginTopSmall,
              ]}
              mode={'outlined'}
            />
          )}
          name="passwordAgain"
        />
        {errors.passwordAgain && (
          <Text style={styles.errors}>{translate('auth.required_field')}</Text>
        )}
        <Button
          loading={loading}
          mode={'contained'}
          onPress={handleSubmit(handleSignUp)}
          style={[styles.width90, globalStyle.marginTopBig]}>
          {translate('auth.register')}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
