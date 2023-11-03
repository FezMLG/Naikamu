import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum AuthStackRoutesNames {
  AppLoading = 'AppLoading',
  Hello = 'Hello',
  ActionRequired = 'ActionRequired',
}

export type AuthStackParameterList = {
  [AuthStackRoutesNames.AppLoading]: undefined;
  [AuthStackRoutesNames.Hello]: undefined;
  [AuthStackRoutesNames.ActionRequired]: undefined;
};

export type AuthStackAppLoadingScreenProps = NativeStackScreenProps<
  AuthStackParameterList,
  AuthStackRoutesNames.AppLoading
>;

export type AuthStackHelloScreenProps = NativeStackScreenProps<
  AuthStackParameterList,
  AuthStackRoutesNames.Hello
>;

export type AuthStackActionRequiredScreenProps = NativeStackScreenProps<
  AuthStackParameterList,
  AuthStackRoutesNames.ActionRequired
>;
