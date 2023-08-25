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

export type AuthStackParamList = {
  [AuthStackRoutesNames.AppLoading]: undefined;
  [AuthStackRoutesNames.Hello]: undefined;
  [AuthStackRoutesNames.Login]: undefined;
  [AuthStackRoutesNames.SignUp]: undefined;
  [AuthStackRoutesNames.VerifyEmail]: undefined;
  [AuthStackRoutesNames.ForgotPassword]: undefined;
  [AuthStackRoutesNames.ActionRequired]: undefined;
};

export type AuthStackAppLoadingScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthStackRoutesNames.AppLoading
>;

export type AuthStackHelloScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthStackRoutesNames.Hello
>;

export type AuthStackLoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthStackRoutesNames.Login
>;

export type AuthStackSignUpScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthStackRoutesNames.SignUp
>;

export type AuthStackVerifyEmailScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthStackRoutesNames.VerifyEmail
>;

export type AuthStackForgotPasswordScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthStackRoutesNames.ForgotPassword
>;

export type AuthStackActionRequiredScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthStackRoutesNames.ActionRequired
>;
