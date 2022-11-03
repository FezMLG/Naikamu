import auth from '@react-native-firebase/auth';

import { User } from '../../interfaces';
import {
  clearAuthenticatedUser,
  getUserFulfilled,
  getUserPending,
  getUserRejected,
} from '../../reducers/user.reducer';
import { AppDispatch } from '../store/store';

export const fireLoginUser =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    const newAuthState = await auth().signInWithEmailAndPassword(
      email,
      password,
    );

    if (!newAuthState.user.emailVerified) {
      await sendEmailVerification();
    }
    dispatch(fireGetUser());
  };

export const fireGetNewIdToken = async () => async (dispatch: AppDispatch) => {
  const user = auth().currentUser;
  if (user) {
    dispatch(fireGetUser());
  }
};

export const fireGetIdToken = () => {
  return auth().currentUser?.getIdToken();
};

export const fireLogoutUser = () => async (dispatch: AppDispatch) => {
  try {
    await auth().signOut();

    dispatch(clearAuthenticatedUser());
  } catch (e) {
    console.log(e);
  }
};

export const fireRegisterUser =
  (displayName: string, email: string, password: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(clearAuthenticatedUser());

    await auth().createUserWithEmailAndPassword(email, password);

    await auth().currentUser?.updateProfile({
      displayName: displayName,
    });

    await sendEmailVerification();
    dispatch(fireGetUser());
  };

export const fireForgotPassword = (email: string) => async () => {
  try {
    await auth().sendPasswordResetEmail(email);
  } catch (e) {
    console.log(e);
  }
};

const sendEmailVerification = async () => {
  await auth().currentUser?.sendEmailVerification({
    handleCodeInApp: true,
    url: 'https://aniwatch.page.link/V9Hh',
  });
};

export const fireGetUser = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getUserPending());
    const fUser = auth().currentUser;
    try {
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
        dispatch(getUserRejected());
      }
    } catch (error) {
      dispatch(getUserRejected());
    }
  } catch (e: unknown) {
    dispatch(getUserRejected());
  }
};
