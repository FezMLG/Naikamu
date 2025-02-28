import { User } from '@naikamu/shared';
import { getAuth } from '@react-native-firebase/auth';

export const fireLoginUser = async (email: string, password: string) => {
  const newAuthState = await getAuth().signInWithEmailAndPassword(
    email,
    password,
  );

  if (newAuthState && !newAuthState.user.emailVerified) {
    await sendEmailVerification();
  }
};

export const fireGetNewIdToken = async () =>
  getAuth().currentUser?.getIdToken(true);

export const fireGetIdToken = () => getAuth().currentUser?.getIdToken();

export const fireLogoutUser = async () => {
  try {
    await getAuth().signOut();
  } catch (error) {
    console.log(error);
  }
};

export const fireRegisterUser = async (
  displayName: string,
  email: string,
  password: string,
) => {
  await getAuth().createUserWithEmailAndPassword(email, password);

  await getAuth().currentUser?.updateProfile({
    displayName,
  });

  await sendEmailVerification();
};

export const fireForgotPassword = (email: string) => async () => {
  try {
    await getAuth().sendPasswordResetEmail(email);
  } catch (error) {
    console.log(error);
  }
};

const sendEmailVerification = async () => {
  await getAuth().currentUser?.sendEmailVerification({
    handleCodeInApp: true,
    url: 'https://naikamu.com',
  });
};

export const fireUpdateUserDisplayName = async (newDisplayName: string) => {
  try {
    const currentUser = getAuth().currentUser;

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
  const currentUser = getAuth().currentUser;

  console.log('heh!');
  if (currentUser) {
    await currentUser.updatePassword(newPassword);
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
  await getAuth().currentUser?.delete();
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
