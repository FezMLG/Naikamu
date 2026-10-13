import { User } from '@naikamu/shared';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  getIdToken,
  sendEmailVerification as fireSendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from '@react-native-firebase/auth';

export const fireLoginUser = async (email: string, password: string) => {
  const newAuthState = await signInWithEmailAndPassword(
    getAuth(),
    email,
    password,
  );

  if (newAuthState && !newAuthState.user.emailVerified) {
    await sendEmailVerification();
  }
};

export const fireGetNewIdToken = async () => {
  const currentUser = getAuth().currentUser;

  return currentUser ? getIdToken(currentUser, true) : undefined;
};

export const fireGetIdToken = () => {
  const currentUser = getAuth().currentUser;

  return currentUser ? getIdToken(currentUser) : undefined;
};

export const fireLogoutUser = async () => {
  try {
    await signOut(getAuth());
  } catch (error) {
    console.log(error);
  }
};

export const fireRegisterUser = async (
  displayName: string,
  email: string,
  password: string,
) => {
  const { user } = await createUserWithEmailAndPassword(
    getAuth(),
    email,
    password,
  );

  await updateProfile(user, {
    displayName,
  });

  await sendEmailVerification();
};

export const fireForgotPassword = (email: string) => async () => {
  try {
    await sendPasswordResetEmail(getAuth(), email);
  } catch (error) {
    console.log(error);
  }
};

const sendEmailVerification = async () => {
  const currentUser = getAuth().currentUser;

  if (currentUser) {
    await fireSendEmailVerification(currentUser, {
      handleCodeInApp: true,
      url: 'https://naikamu.com',
    });
  }
};

export const fireUpdateUserDisplayName = async (newDisplayName: string) => {
  try {
    const currentUser = getAuth().currentUser;

    if (currentUser) {
      await updateProfile(currentUser, {
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
  } catch (error) {
    console.error(error);
  }
};

export const fireUpdatePassword = async (newPassword: string) => {
  const currentUser = getAuth().currentUser;

  console.log('heh!');
  if (currentUser) {
    await updatePassword(currentUser, newPassword);
    console.log('Password updated!');
  }
};

export const fireReauthenticate = async (password: string) => {
  const currentUser = getAuth().currentUser;

  if (currentUser) {
    if (!currentUser.email) {
      throw new Error('No email found');
    }
    await fireLoginUser(currentUser.email, password);
    console.log('Reauthenticated!');
  }
};

export const fireDeleteAccount = async () => {
  const currentUser = getAuth().currentUser;

  if (currentUser) {
    await deleteUser(currentUser);
  }
};

export const fireGetUser = () => {
  const fUser = getAuth().currentUser;

  if (fUser) {
    const user: User = {
      displayName: fUser.displayName,
      email: fUser.email,
      emailVerified: fUser.emailVerified,
      isAnonymous: fUser.isAnonymous,
      uid: fUser.uid,
      picture: fUser.photoURL,
      shindenUserId: null,
    };

    return user;
  } else {
    return null;
  }
};
