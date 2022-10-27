import auth from '@react-native-firebase/auth';

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

export interface User {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  uid: string;
}

export const loginUser =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    const newAuthState = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
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
