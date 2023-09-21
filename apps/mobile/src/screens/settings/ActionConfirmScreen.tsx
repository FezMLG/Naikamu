import React from 'react';

import { Control, FieldErrorsImpl, Controller, useForm } from 'react-hook-form';
import { KeyboardTypeOptions, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

import { Button, PageLayout, useLayout } from '../../components';
import { useTranslate } from '../../i18n/useTranslate';
import { SettingsStackSettingsActionConfirmScreenProps } from '../../routes';
import { fireReauthenticate } from '../../services/firebase/fire-auth.service';
import { globalStyle } from '../../styles';

interface SettingsForm {
  password: string;
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
  control: Control<SettingsForm>;
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
            style={styles.center}
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

export function SettingsActionConfirmScreen({
  route,
  navigation,
}: SettingsStackSettingsActionConfirmScreenProps) {
  const layout = useLayout();
  const { action, payload, origin } = route.params;
  const { translate } = useTranslate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
    },
  });

  const handleAction = async (data: SettingsForm) => {
    try {
      console.log(data);
      await fireReauthenticate(data.password);
      await action(payload);
      navigation.navigate(origin);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageLayout.Default {...layout}>
      <FormTextInput
        control={control}
        errors={errors}
        keyboardType="ascii-capable"
        name="password"
        placeholder={payload ?? translate('forms.fields.save')}
        title={translate('forms.labels.password')}
      />
      <Button
        label={translate('forms.save')}
        onPress={handleSubmit(handleAction)}
        style={[globalStyle.marginTopBig]}
        type="primary"
      />
    </PageLayout.Default>
  );
}

const styles = StyleSheet.create({
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
  formInputs: {
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
});
