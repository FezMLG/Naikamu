import React from 'react';
import { KeyboardTypeOptions, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput } from 'react-native-paper';
import { Control, Controller, FieldErrorsImpl, useForm } from 'react-hook-form';

import { useTranslate } from '../../i18n/useTranslate';
import { globalStyle } from '../../styles/global.style';
import {
  SettingsActionScreenProps,
  SettingsScreenNames,
} from '../../routes/settings/interfaces';
import AccountDelete from '../../components/settings/AccountDelete';
import { Button } from '../../components';
import { useAppDispatch } from '../../services/store/store';
import { ActionType } from '../../../../../lib/shared/dist';
import {
  fireUpdatePassword,
  fireUpdateUser,
} from '../../services/firebase/fire-auth.service';

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

const SettingsActionScreen = ({
  route,
  navigation,
}: SettingsActionScreenProps) => {
  const { action, type } = route.params;
  const { translate } = useTranslate();
  const dispatch = useAppDispatch();

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
    console.log(data);
    try {
      console.log('1');
      await dispatch(action(data.newValue));
      console.log('2');
    } catch (error: any) {
      if (error.code === 'auth/requires-recent-login') {
        console.log('requires recent login');
        navigation.navigate(SettingsScreenNames.SettingsActionConfirm, {
          action,
          type,
        });
      }
    }
    console.log('3');
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <FormTextInput
        control={control}
        name={'newValue'}
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

export default SettingsActionScreen;
