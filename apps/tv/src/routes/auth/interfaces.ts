import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum AuthRoutesNames {
  AppLoading = 'AppLoading',
  Hello = 'Hello',
  Login = 'Login',
  SignUp = 'SignUp',
  VerifyEmail = 'VerifyEmail',
  ForgotPassword = 'ForgotPassword',
}

export type AuthStackParamList = {
  [AuthRoutesNames.AppLoading]: undefined;
  [AuthRoutesNames.Hello]: undefined;
  [AuthRoutesNames.Login]: undefined;
  [AuthRoutesNames.SignUp]: undefined;
  [AuthRoutesNames.VerifyEmail]: undefined;
  [AuthRoutesNames.ForgotPassword]: undefined;
};

export type AppLoadingScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthRoutesNames.AppLoading
>;

export type HelloScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthRoutesNames.Hello
>;

export type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthRoutesNames.Login
>;

export type SignUpScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthRoutesNames.SignUp
>;

export type VerifyEmailScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthRoutesNames.VerifyEmail
>;

export type ForgotPasswordScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthRoutesNames.ForgotPassword
>;
