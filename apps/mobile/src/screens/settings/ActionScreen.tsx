import React from 'react';
import { KeyboardTypeOptions, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { Control, Controller, FieldErrorsImpl, useForm } from 'react-hook-form';

import { useTranslate } from '../../i18n/useTranslate';
import { globalStyle } from '../../styles/global.style';
import {
  SettingsActionScreenProps,
  SettingsScreenNames,
} from '../../routes/settings/interfaces';
import { Button, useLayout } from '../../components';

interface SettingsForm {
  newValue: string;
}

type SettingsFormType = keyof SettingsForm;

const FormTextInput = ({
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
}) => {
  const { translate } = useTranslate();
  return (
    <View>
      <Text style={[globalStyle.marginTop]}>{title}</Text>
      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            placeholder={placeholder}
            autoCapitalize="none"
            keyboardType={keyboardType}
            autoCorrect={autoCorrect}
            style={[styles.textInput, styles.width90]}
            mode={'outlined'}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
        name={name}
      />
      {errors[name] && (
        <Text style={[globalStyle.marginTop]}>
          {translate('forms.fields.' + name)}
        </Text>
      )}
    </View>
  );
};

const SettingsActionScreen = ({
  route,
  navigation,
}: SettingsActionScreenProps) => {
  const { PageLayout } = useLayout();
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
      // await dispatch(action(data.newValue));
      navigation.navigate(origin);
    } catch (error: any) {
      if (error.code === 'auth/requires-recent-login') {
        console.log('requires recent login catch');
        navigation.navigate(SettingsScreenNames.SettingsActionConfirm, {
          action,
          payload: data.newValue,
          type,
          origin,
        });
      }
    }
  };

  return (
    <PageLayout style={[styles.container]}>
      <FormTextInput
        title={translate('forms.labels.new' + type)}
        control={control}
        name={'newValue'}
        keyboardType={'ascii-capable'}
        errors={errors}
        placeholder={payload ?? translate('forms.fields.' + type)}
      />
      <Button
        label={
          requiresLogin ? translate('forms.continue') : translate('forms.save')
        }
        type={requiresLogin ? 'primary' : 'secondary'}
        onPress={handleSubmit(handleAction)}
        style={[globalStyle.marginTopBig]}
      />
    </PageLayout>
  );
};

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

export default SettingsActionScreen;
