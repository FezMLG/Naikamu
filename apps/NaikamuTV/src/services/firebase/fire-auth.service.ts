import { User } from '@naikamu/shared';
import auth from '@react-native-firebase/auth';

export const fireLoginUser = async (email: string, password: string) => {
  await auth().signInWithEmailAndPassword(email, password);
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
    };

    return user;
  } else {
    return null;
  }
};
