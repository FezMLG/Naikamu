import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { LoginScreenProps, AuthRoutesNames } from '../../routes/auth';
import { fireLoginUser } from '../../services/firebase/fire-auth.service';
import { RootState, useAppDispatch } from '../../services/redux/store';
import { useForm, Controller } from 'react-hook-form';
import { globalStyle } from '../../styles/global.style';
import { useTranslate } from '../../i18n/useTranslate';
import { useErrorHandler } from '../../components/atoms/ErrorHandler/ErrorHandler';
import { useLayout } from '../../components/atoms/Layout';
import { Button } from '../../components';

interface LoginUser {
  email: string;
  password: string;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { PageLayout, setInfo, setVisible } = useLayout();
  const [loading, isLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { translate } = useTranslate();
  const { user } = useSelector((state: RootState) => state.user);
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

  const handleLogin = async (data: LoginUser) => {
    isLoading(true);
    try {
      await dispatch(fireLoginUser(data.email, data.password));
      isLoading(false);
      if (user && !user.emailVerified) {
        try {
          navigation.navigate(AuthRoutesNames.VerifyEmail);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error: any) {
      setInfo(translate(errorResolver(error.code)));
      setVisible(true);
    }
    isLoading(false);
  };

  return (
    <PageLayout>
      <View style={[styles.formInputs, globalStyle.spacerBig]}>
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
          label={translate('auth.login')}
          type={'primary'}
          disabled={loading}
          loading={loading}
          style={[globalStyle.marginTopBig]}
          onPress={handleSubmit(handleLogin)}
        />
        <Button
          label={translate('auth.forgot_password')}
          type={'link'}
          disabled={loading}
          style={[globalStyle.marginTopSmall]}
          onPress={() => navigation.navigate(AuthRoutesNames.ForgotPassword)}
        />
      </View>
    </PageLayout>
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
  width90: {
    maxWidth: 500,
    width: '90%',
    minWidth: 10,
  },
});
