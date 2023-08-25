import React from 'react';

import { Control, Controller, FieldErrorsImpl, useForm } from 'react-hook-form';
import { KeyboardTypeOptions, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

import { Button, PageLayout, useLayout } from '../../components';
import { useTranslate } from '../../i18n/useTranslate';
import {
  SettingsStackScreenNames,
  SettingsStackSettingsActionScreenProps,
} from '../../routes';
import { globalStyle } from '../../styles';

interface SettingsForm {
  newValue: string;
}

type SettingsFormType = keyof SettingsForm;

function FormTextInput({
  control,
  errors,
  name,
  keyboardType,
  autoCorrect = false,
  placeholder,
  title,
}: {
  control: Control<SettingsForm, any>;
  name: SettingsFormType;
  keyboardType?: KeyboardTypeOptions;
  autoCorrect?: boolean;
  errors: Partial<FieldErrorsImpl<SettingsForm>>;
  placeholder: string;
  title: string;
}) {
  const { translate } = useTranslate();

  return (
    <View>
      <Text style={[globalStyle.marginTop]}>{title}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            autoCapitalize="none"
            autoCorrect={autoCorrect}
            keyboardType={keyboardType}
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder={placeholder}
            style={[styles.textInput, styles.width90]}
            value={value}
          />
        )}
        rules={{
          required: true,
          maxLength: 100,
        }}
      />
      {errors[name] && (
        <Text style={[globalStyle.marginTop]}>
          {translate('forms.fields.' + name)}
        </Text>
      )}
    </View>
  );
}

export function SettingsActionScreen({
  route,
  navigation,
}: SettingsStackSettingsActionScreenProps) {
  const layout = useLayout();
  const { type, action, requiresLogin, origin, payload } = route.params;
  const { translate } = useTranslate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newValue: '',
    },
  });

  const handleAction = async (data: SettingsForm) => {
    try {
      if (requiresLogin) {
        console.log('requires recent login throw');
        throw { code: 'auth/requires-recent-login' };
      }
      console.log('not requires recent login');
      await action(data.newValue);
      navigation.navigate(origin);
    } catch (error: any) {
      if (error.code === 'auth/requires-recent-login') {
        console.log('requires recent login catch');
        navigation.navigate(SettingsStackScreenNames.SettingsActionConfirm, {
          action,
          payload: data.newValue,
          type,
          origin,
        });
      }
    }
  };

  return (
    <PageLayout.Default style={[styles.container]} {...layout}>
      <FormTextInput
        control={control}
        errors={errors}
        keyboardType="ascii-capable"
        name="newValue"
        placeholder={payload ?? translate('forms.fields.' + type)}
        title={translate('forms.labels.new' + type)}
      />
      <Button
        label={
          requiresLogin ? translate('forms.continue') : translate('forms.save')
        }
        onPress={handleSubmit(handleAction)}
        style={[globalStyle.marginTopBig]}
        type={requiresLogin ? 'primary' : 'secondary'}
      />
    </PageLayout.Default>
  );
}

const styles = StyleSheet.create({
  container: {},
  logo: {
    maxWidth: 200,
    maxHeight: 200,
  },
  highlight: {
    fontWeight: 'bold',
  },
  center: {
    alignSelf: 'center',
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
  textCenter: {
    textAlign: 'center',
  },
});
