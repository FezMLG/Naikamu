import React from 'react';
import { KeyboardTypeOptions, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput } from 'react-native-paper';

import { useTranslate } from '../../i18n/useTranslate';
import { globalStyle } from '../../styles/global.style';
import { SettingsActionConfirmScreenProps } from '../../routes/settings/interfaces';
import { Control, FieldErrorsImpl, Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../services/store/store';
import { fireReauthenticate } from '../../services/firebase/fire-auth.service';
import { Button, useLayout } from '../../components';

interface SettingsForm {
  password: string;
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

const SettingsActionConfirmScreen = ({
  route,
  navigation,
}: SettingsActionConfirmScreenProps) => {
  const { PageLayout } = useLayout();
  const { action, type, payload, origin } = route.params;
  const { translate } = useTranslate();
  const dispatch = useAppDispatch();

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
      await dispatch(fireReauthenticate(data.password));
      await dispatch(action(payload));
      navigation.navigate(origin);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageLayout style={[styles.container]}>
      <FormTextInput
        title={translate('forms.labels.password')}
        control={control}
        name={'password'}
        keyboardType={'ascii-capable'}
        errors={errors}
        placeholder={payload ?? translate('forms.fields.save')}
      />
      <Button
        label={translate('forms.save')}
        type={'primary'}
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

export default SettingsActionConfirmScreen;
