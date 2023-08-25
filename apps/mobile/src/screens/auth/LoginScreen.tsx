import React, { useState } from 'react';

import { useForm, Controller } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

import {
  useErrorHandler,
  PageLayout,
  useLayout,
  Button,
} from '../../components';
import { useTranslate } from '../../i18n/useTranslate';
import { AuthStackLoginScreenProps, AuthStackRoutesNames } from '../../routes';
import { useUserService } from '../../services/auth/user.service';
import { useUserStore } from '../../services/auth/user.store';
import { globalStyle } from '../../styles';

export interface LoginForm {
  email: string;
  password: string;
}

export function LoginScreen({ navigation }: AuthStackLoginScreenProps) {
  const userService = useUserService();
  const layout = useLayout();
  const [loading, isLoading] = useState(false);
  const { translate } = useTranslate();
  const user = useUserStore(state => state.user);
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
    isLoading(true);
    try {
      userService.loginUser(data);
      isLoading(false);
      if (user && !user.emailVerified) {
        try {
          navigation.navigate(AuthStackRoutesNames.VerifyEmail);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error: any) {
      layout.setInfo(translate(errorResolver(error.code)));
      layout.setVisible(true);
    }
    isLoading(false);
  };

  return (
    <PageLayout.Default {...layout}>
      <View style={[styles.formInputs, globalStyle.spacerBig]}>
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
              style={[styles.textInput, styles.width90, globalStyle.marginTop]}
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
