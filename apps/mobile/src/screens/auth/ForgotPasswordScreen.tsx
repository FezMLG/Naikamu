import React, { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import Timer from '../../components/Timer';
import { useTranslate } from '../../i18n/useTranslate';
import { AuthStackForgotPasswordScreenProps } from '../../routes';
import { fireForgotPassword } from '../../services/firebase/fire-auth.service';
import { globalStyle } from '../../styles';

interface ForgetPassword {
  email: string;
}

export function ForgotPasswordScreen({}: AuthStackForgotPasswordScreenProps) {
  const [loading, isLoading] = useState(false);
  const [emailSent, isEmailSent] = useState(false);
  const { translate } = useTranslate();
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

  const handleForgot = async (data: ForgetPassword) => {
    isLoading(true);
    try {
      await fireForgotPassword(data.email);
    } catch {}
    isLoading(false);
    isEmailSent(true);
  };

  useEffect(() => {
    if (emailSent) {
      setTimeout(() => {
        isEmailSent(false);
      }, 10_000);
    }
  }, [emailSent]);

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.formInputs}>
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
              style={[styles.textInput, styles.width90]}
              value={value}
            />
          )}
          rules={{
            required: true,
            maxLength: 100,
          }}
        />
        {errors.email && (
          <Text style={[globalStyle.errors, globalStyle.spacerSmall]}>
            {translate('auth.required_field')}
          </Text>
        )}
        {/* TODO FIXME can reset timer after going back and in again */}
        <Button
          disabled={emailSent}
          loading={loading}
          mode="contained"
          onPress={handleSubmit(handleForgot)}
          style={globalStyle.marginTop}>
          {translate('auth.email_sent')}{' '}
          {emailSent && <Timer initialMinute={0} initialSeconds={10} />}
        </Button>
        {emailSent && (
          <Text style={globalStyle.marginTop}>
            {translate('auth.email_has_been_sent')}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    maxWidth: 200,
    maxHeight: 200,
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
