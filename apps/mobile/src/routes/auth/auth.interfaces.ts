import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum AuthStackRoutesNames {
  AppLoading = 'AppLoading',
  Hello = 'Hello',
  Login = 'Login',
  SignUp = 'SignUp',
  VerifyEmail = 'VerifyEmail',
  ForgotPassword = 'ForgotPassword',
  ActionRequired = 'ActionRequired',
}

export type AuthStackParameterList = {
  [AuthStackRoutesNames.AppLoading]: undefined;
  [AuthStackRoutesNames.Hello]: undefined;
  [AuthStackRoutesNames.Login]: undefined;
  [AuthStackRoutesNames.SignUp]: undefined;
  [AuthStackRoutesNames.VerifyEmail]: undefined;
  [AuthStackRoutesNames.ForgotPassword]: undefined;
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

export type AuthStackLoginScreenProps = NativeStackScreenProps<
  AuthStackParameterList,
  AuthStackRoutesNames.Login
>;

export type AuthStackSignUpScreenProps = NativeStackScreenProps<
  AuthStackParameterList,
  AuthStackRoutesNames.SignUp
>;

export type AuthStackVerifyEmailScreenProps = NativeStackScreenProps<
  AuthStackParameterList,
  AuthStackRoutesNames.VerifyEmail
>;

export type AuthStackForgotPasswordScreenProps = NativeStackScreenProps<
  AuthStackParameterList,
  AuthStackRoutesNames.ForgotPassword
>;

export type AuthStackActionRequiredScreenProps = NativeStackScreenProps<
  AuthStackParameterList,
  AuthStackRoutesNames.ActionRequired
>;
