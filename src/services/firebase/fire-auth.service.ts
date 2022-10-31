import auth from '@react-native-firebase/auth';
import { User } from '../../interfaces';

import {
  clearAuthenticatedUser,
  getUserFulfilled,
  getUserPending,
  getUserRejected,
} from '../../reducers/user.reducer';
import { AppDispatch } from '../store/store';
import {
  fireSaveTokensToStorage,
  fireResetTokensStorage,
} from './fire-auth-storage.service';

export const fireLoginUser =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    const newAuthState = await auth().signInWithEmailAndPassword(
      email,
      password,
    );

    if (!newAuthState.user.emailVerified) {
      await newAuthState.user.sendEmailVerification({
        handleCodeInApp: true,
        url: 'https://aniwatch-1f64a.firebaseapp.com/__/auth/action',
      });
    }

    const token = await newAuthState.user.getIdToken();
    await fireSaveTokensToStorage(token);
    dispatch(fireGetUser());
  };

export const fireLogoutUser = () => async (dispatch: AppDispatch) => {
  try {
    await auth().signOut();

    await fireResetTokensStorage();

    dispatch(clearAuthenticatedUser());
  } catch (e) {
    console.log(e);
  }
};

export const fireRegisterUser =
  (displayName: string, email: string, password: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const createdUser = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      await createdUser.user.updateProfile({
        displayName: displayName,
      });

      await createdUser.user.sendEmailVerification({
        handleCodeInApp: true,
        url: 'https://aniwatch-1f64a.firebaseapp.com/__/auth/action',
      });

      await fireResetTokensStorage();

      dispatch(clearAuthenticatedUser());
    } catch (e) {
      console.log(e);
    }
  };

export const fireVerifyEmail =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);

      await fireResetTokensStorage();

      dispatch(clearAuthenticatedUser());
    } catch (e) {
      console.log(e);
    }
  };

export const fireGetUser = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getUserPending());

    const fUser = auth().currentUser;

    if (fUser) {
      const user: User = {
        displayName: fUser.displayName,
        email: fUser.email,
        emailVerified: fUser.emailVerified,
        isAnonymous: fUser.isAnonymous,
        uid: fUser.uid,
      };
      dispatch(getUserFulfilled(user));
    } else {
      throw new Error('User get error');
    }
  } catch (e: unknown) {
    dispatch(getUserRejected());
  }
};
