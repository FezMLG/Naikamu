import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum AuthRoutesNames {
  AppLoading = 'AppLoading',
  Hello = 'Hello',
  Login = 'Login',
  SignUp = 'SignUp',
  CreateSession = 'CreateSession',
  VerifyEmail = 'VerifyEmail',
}

export type AuthStackParamList = {
  [AuthRoutesNames.AppLoading]: undefined;
  [AuthRoutesNames.Hello]: undefined;
  [AuthRoutesNames.Login]: undefined;
  [AuthRoutesNames.SignUp]: undefined;
  [AuthRoutesNames.CreateSession]: undefined;
  [AuthRoutesNames.VerifyEmail]: undefined;
};

export type AppLoadingPageProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthRoutesNames.AppLoading
>;

export type HelloPageProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthRoutesNames.Hello
>;

export type LoginPageProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthRoutesNames.Login
>;

export type SignupPageProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthRoutesNames.SignUp
>;

export type CreateSessionPageProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthRoutesNames.CreateSession
>;

export type VerifyEmailPageProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthRoutesNames.VerifyEmail
>;
