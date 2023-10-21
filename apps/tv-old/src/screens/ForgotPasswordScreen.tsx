import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import { ForgotPasswordScreenProps } from '../routes/auth';
import { useAppDispatch } from '../services/store/store';
import { fireForgotPassword } from '../services/firebase/fire-auth.service';
import { useTranslate } from '../i18n/useTranslate';
import { Controller, useForm } from 'react-hook-form';
import { globalStyle } from '../styles/global.style';
import Timer from '../components/Timer';

interface ForgetPassword {
  email: string;
}

const ForgotPasswordScreen = ({}: ForgotPasswordScreenProps) => {
  const [loading, isLoading] = useState(false);
  const [emailSent, isEmailSent] = useState(false);
  const dispatch = useAppDispatch();
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
      await dispatch(fireForgotPassword(data.email));
    } catch {}
    isLoading(false);
    isEmailSent(true);
  };

  useEffect(() => {
    if (emailSent) {
      setTimeout(() => {
        isEmailSent(false);
      }, 10000);
    }
  }, [emailSent]);

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.formInputs}>
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
              style={[styles.textInput, styles.width90]}
              mode={'outlined'}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={[globalStyle.errors, globalStyle.spacerSmall]}>
            {translate('auth.required_field')}
          </Text>
        )}
        {/* TODO FIXME can reset timer after going back and in again */}
        <Button
          loading={loading}
          disabled={emailSent}
          onPress={handleSubmit(handleForgot)}
          mode={'contained'}
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
};

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

export default ForgotPasswordScreen;
