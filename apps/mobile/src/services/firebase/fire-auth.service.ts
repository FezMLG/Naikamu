import auth from '@react-native-firebase/auth';

import { User } from '@aniwatch/shared';
import {
  clearAuthenticatedUser,
  getUserFulfilled,
  getUserPending,
  getUserRejected,
} from '../store/reducers/user.reducer';
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

export const fireUpdateUserDisplayName =
  (newDisplayName: string) => async (dispatch: AppDispatch) => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        await currentUser.updateProfile({
          displayName: newDisplayName,
        });

        console.log('updated!');

        // if (form.email !== currentUser.email) {
        //   await currentUser.verifyBeforeUpdateEmail(form.email, {
        //     handleCodeInApp: true,
        //     url: 'https://aniwatch.page.link/V9Hh',
        //   });
        // }
      }
      dispatch(fireGetUser());
    } catch (error) {
      console.error(error);
    }
  };

export const fireUpdatePassword =
  (newPassword: string) => async (dispatch: AppDispatch) => {
    const currentUser = auth().currentUser;
    console.log('heh!');
    if (currentUser) {
      await currentUser.updatePassword(newPassword);
      console.log('Password updated!');
    }
    dispatch(fireGetUser());
  };

export const fireReauthenticate =
  (password: string) => async (dispatch: AppDispatch) => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      if (!currentUser.email) {
        throw new Error('No email found');
      }
      dispatch(fireLoginUser(currentUser.email, password));
    }
    dispatch(fireGetUser());
  };

export const fireDeleteAccount = () => async (dispatch: AppDispatch) => {
  await auth().currentUser?.delete();
  dispatch(clearAuthenticatedUser());
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
          picture: fUser.photoURL,
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
