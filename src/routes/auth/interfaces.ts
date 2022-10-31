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

export type CreateSessionScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthRoutesNames.CreateSession
>;

export type VerifyEmailScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthRoutesNames.VerifyEmail
>;
