import { User } from '@naikamu/shared';
import {
  getAuth,
  getIdToken,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';

import { logger, reportError } from '../../utils';

export const fireLoginUser = async (email: string, password: string) => {
  await signInWithEmailAndPassword(getAuth(), email, password);
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
    logger('fireLogoutUser').warn(error);
    reportError(error);
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
