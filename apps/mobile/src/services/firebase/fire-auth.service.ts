import { User } from '@naikamu/shared';
import auth from '@react-native-firebase/auth';

export const fireLoginUser = async (email: string, password: string) => {
  const newAuthState = await auth().signInWithEmailAndPassword(email, password);

  if (newAuthState && !newAuthState.user.emailVerified) {
    await sendEmailVerification();
  }
};

export const fireGetNewIdToken = async () =>
  auth().currentUser?.getIdToken(true);

export const fireGetIdToken = () => auth().currentUser?.getIdToken();

export const fireLogoutUser = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    console.log(error);
  }
};

export const fireRegisterUser = async (
  displayName: string,
  email: string,
  password: string,
) => {
  await auth().createUserWithEmailAndPassword(email, password);

  await auth().currentUser?.updateProfile({
    displayName,
  });

  await sendEmailVerification();
};

export const fireForgotPassword = (email: string) => async () => {
  try {
    await auth().sendPasswordResetEmail(email);
  } catch (error) {
    console.log(error);
  }
};

const sendEmailVerification = async () => {
  await auth().currentUser?.sendEmailVerification({
    handleCodeInApp: true,
    url: 'https://naikamu.com',
  });
};

export const fireUpdateUserDisplayName = async (newDisplayName: string) => {
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
  } catch (error) {
    console.error(error);
  }
};

export const fireUpdatePassword = async (newPassword: string) => {
  const currentUser = auth().currentUser;

  console.log('heh!');
  if (currentUser) {
    await currentUser.updatePassword(newPassword);
    console.log('Password updated!');
  }
};

export const fireReauthenticate = async (password: string) => {
  const currentUser = auth().currentUser;

  if (currentUser) {
    if (!currentUser.email) {
      throw new Error('No email found');
    }
    await fireLoginUser(currentUser.email, password);
    console.log('Reauthenticated!');
  }
};

export const fireDeleteAccount = async () => {
  await auth().currentUser?.delete();
};

export const fireGetUser = () => {
  const fUser = auth().currentUser;

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
