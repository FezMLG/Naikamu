import auth from '@react-native-firebase/auth';
import { User } from '../interfaces';

import {
  clearAuthenticatedUser,
  getUserFulfilled,
  getUserPending,
  getUserRejected,
} from '../reducers/user.reducer';
import {
  resetTokensStorage,
  saveTokensToStorage,
} from './auth-storage.service';
import { AppDispatch } from './store/store';

export const loginUser =
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
    await saveTokensToStorage(token);
    dispatch(getUser());
  };

export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    await auth().signOut();

    await resetTokensStorage();

    dispatch(clearAuthenticatedUser());
  } catch (e) {
    console.log(e);
  }
};

export const registerUser =
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

      await resetTokensStorage();

      dispatch(clearAuthenticatedUser());
    } catch (e) {
      console.log(e);
    }
  };

export const verifyEmail =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);

      await resetTokensStorage();

      dispatch(clearAuthenticatedUser());
    } catch (e) {
      console.log(e);
    }
  };

export const getUser = () => async (dispatch: AppDispatch) => {
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
