import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { LoginScreenProps, AuthRoutesNames } from '../../routes/auth';
import { fireLoginUser } from '../../services/firebase/fire-auth.service';
import { RootState, useAppDispatch } from '../../services/store/store';
import { useForm, Controller } from 'react-hook-form';
import { globalStyle } from '../../styles/global.style';
import { useTranslate } from '../../i18n/useTranslate';

interface LoginUser {
  email: string;
  password: string;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
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
      email: '',
      password: '',
    },
  });

  const handleLogin = async (data: LoginUser) => {
    try {
      isLoading(true);
      await dispatch(fireLoginUser(data.email, data.password));
      isLoading(false);
      if (user && !user.emailVerified) {
        try {
          navigation.navigate(AuthRoutesNames.VerifyEmail);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') {
        setAuthError(translate('auth.errors.invalid_email'));
      } else if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        setAuthError(translate('auth.errors.user_not_found'));
      } else {
        console.log(error);
        setAuthError(translate('auth.errors.unknown'));
      }
    }
    isLoading(false);
  };

  useEffect(() => {});

  return (
    <SafeAreaView style={styles.container}>
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
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              style={[styles.textInput, styles.width90, globalStyle.marginTop]}
              mode={'outlined'}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={globalStyle.errors}>
            {translate('auth.required_field')}
          </Text>
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
              placeholder={translate('auth.password')}
              secureTextEntry={true}
              style={[
                styles.textInput,
                styles.width90,
                globalStyle.marginTopSmall,
              ]}
              mode={'outlined'}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={globalStyle.errors}>
            {translate('auth.required_field')}
          </Text>
        )}
        <Button
          loading={loading}
          onPress={handleSubmit(handleLogin)}
          mode={'contained'}
          disabled={loading}
          style={[styles.width90, globalStyle.marginTopBig]}>
          {translate('auth.login')}
        </Button>
        <Button
          mode={'text'}
          style={[styles.width90, globalStyle.marginTopSmall]}
          onPress={() => navigation.navigate(AuthRoutesNames.ForgotPassword)}>
          {translate('auth.forgot_password')}
        </Button>
      </View>
    </SafeAreaView>
  );
}

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
  width90: {
    maxWidth: 500,
    width: '90%',
    minWidth: 10,
  },
});
