import React from 'react';
import { KeyboardTypeOptions, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput } from 'react-native-paper';

import { useTranslate } from '../../i18n/useTranslate';
import { globalStyle } from '../../styles/global.style';
import {
  SettingsActionConfirmScreenProps,
  SettingsScreenNames,
} from '../../routes/settings/interfaces';
import { Control, FieldErrorsImpl, Controller, useForm } from 'react-hook-form';
import AccountDelete from '../../components/settings/AccountDelete';
import { useAppDispatch } from '../../services/store/store';
import { fireReauthenticate } from '../../services/firebase/fire-auth.service';
import { Button } from '../../components';

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
}: {
  control: Control<SettingsForm, any>;
  name: SettingsFormType;
  keyboardType?: KeyboardTypeOptions;
  autoCorrect?: boolean;
  errors: Partial<FieldErrorsImpl<SettingsForm>>;
}) => {
  const { translate } = useTranslate();
  return (
    <View>
      <Text style={[globalStyle.marginTop]}>
        {translate('forms.fields.' + name)}
      </Text>
      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            placeholder={translate('forms.fields.' + name)}
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
      <AccountDelete />
    </View>
  );
};

const SettingsActionConfirmScreen = ({
  route,
  navigation,
}: SettingsActionConfirmScreenProps) => {
  const { action, type, payload } = route.params;
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
    console.log(data);
    await dispatch(fireReauthenticate(data.password));
    await dispatch(action(payload));
    navigation.navigate(SettingsScreenNames.UserSettings);
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <FormTextInput
        control={control}
        name={'password'}
        keyboardType={'ascii-capable'}
        errors={errors}
      />
      <Button
        label={translate('actions.' + type + '.confirm')}
        type={'link'}
        onPress={handleSubmit(handleAction)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 400,
    alignItems: 'center',
  },
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
