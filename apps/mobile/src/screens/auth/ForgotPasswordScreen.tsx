import React, { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import {
  Button,
  PageLayout,
  TextInput,
  Timer,
  useLayout,
} from '../../components';
import { useTranslate } from '../../i18n/useTranslate';
import { AuthStackForgotPasswordScreenProps } from '../../routes';
import { fireForgotPassword } from '../../services/firebase/fire-auth.service';
import { colors, fontStyles, globalStyle } from '../../styles';

interface ForgetPassword {
  email: string;
}

export function ForgotPasswordScreen({}: AuthStackForgotPasswordScreenProps) {
  const layout = useLayout();
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
      fireForgotPassword(data.email);
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
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Email"
              style={[styles.textInput]}
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
          label={translate('auth.email_sent')}
          loading={loading}
          onPress={handleSubmit(handleForgot)}
          style={[globalStyle.marginTop]}
          type="primary"
        />
        {emailSent && <Timer initialMinute={0} initialSeconds={10} />}
        {emailSent && (
          <Text
            style={[globalStyle.marginTop, fontStyles.text, colors.textLight]}>
            {translate('auth.email_has_been_sent')}
          </Text>
        )}
      </View>
    </PageLayout.Default>
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
});
