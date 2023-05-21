import React from 'react';
import {
  KeyboardTypeOptions,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useForm, Controller, Control, FieldErrorsImpl } from 'react-hook-form';

import { RootState, useAppDispatch } from '../../services/store/store';
import { useTranslate } from '../../i18n/useTranslate';
import { globalStyle } from '../../styles/global.style';
import { fireUpdateUser } from '../../services/firebase/fire-auth.service';
import { UserSettingsScreenProps } from '../../routes/settings/interfaces';
import AccountDelete from '../../components/settings/AccountDelete';

export interface UserSettingsForm {
  displayName: string;
  email: string;
}

type UserSettingsFormType = keyof UserSettingsForm;

const FormTextInput = ({
  control,
  errors,
  name,
  keyboardType,
  autoCorrect = false,
}: {
  control: Control<UserSettingsForm, any>;
  name: UserSettingsFormType;
  keyboardType?: KeyboardTypeOptions;
  autoCorrect?: boolean;
  errors: Partial<FieldErrorsImpl<UserSettingsForm>>;
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

const UserSettingsScreen = ({}: UserSettingsScreenProps) => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const { translate } = useTranslate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: user?.displayName ?? '',
      email: user?.email ?? '',
    },
  });

  const handleSettingsSubmit = async (data: UserSettingsForm) => {
    //TODO confirmation about updated data
    await dispatch(fireUpdateUser(data));
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <View>
        <Text
          style={[styles.textCenter, globalStyle.marginTop]}
          variant="titleLarge">
          {user?.displayName}
        </Text>
        <Text style={styles.textCenter} variant="titleMedium">
          {user?.email}
        </Text>
      </View>
      <View style={[styles.formInputs, globalStyle.spacerBig]}>
        <FormTextInput
          control={control}
          name={'displayName'}
          keyboardType={'ascii-capable'}
          errors={errors}
        />
        {/* <FormTextInput
          control={control}
          name={'email'}
          keyboardType={'email-address'}
          errors={errors}
        /> */}
        <Button
          mode={'contained'}
          style={[styles.center, globalStyle.marginTopBig]}
          onPress={handleSubmit(handleSettingsSubmit)}>
          {translate('forms.save')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
    resizeMode: 'cover',
    backgroundColor: 'transparent',
    alignSelf: 'center',
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

export default UserSettingsScreen;
