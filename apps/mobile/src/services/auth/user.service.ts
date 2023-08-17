import { LoginForm } from '../../screens/auth/LoginScreen';
import { SignUpForm } from '../../screens/auth/SignUpScreen';
import { logger } from '../../utils/logger';
import {
  fireDeleteAccount,
  fireGetUser,
  fireLoginUser,
  fireLogoutUser,
  fireRegisterUser,
  fireUpdatePassword,
  fireUpdateUserDisplayName,
} from '../firebase/fire-auth.service';
import { userStorage } from './user.storage';
import { useUserStore } from './user.store';

export const useUserService = () => {
  const userActions = useUserStore(state => state.actions);

  const setLoggedUser = async () => {
    const user = fireGetUser();
    userActions.setUser(user);
    await userStorage.saveUser(user);
  };

  const loginUser = async (data: LoginForm) => {
    await fireLoginUser(data.email, data.password);
    await setLoggedUser();
    return userActions.getUser();
  };

  const registerUser = async (data: SignUpForm) => {
    await fireRegisterUser(data.displayName, data.email, data.password);
    await setLoggedUser();
    return userActions.getUser();
  };

  const logoutUser = async () => {
    await fireLogoutUser();
    userActions.setUser(null);
  };

  const updateUserDisplayName = async (displayName: string) => {
    console.log(displayName);
    await fireUpdateUserDisplayName(displayName);
    console.log(fireGetUser());
    userActions.updateUser({
      displayName,
    });
  };

  const updateUserPassword = async (newPassword: string) => {
    await fireUpdatePassword(newPassword);
  };

  const deleteUserAccount = async () => {
    await fireDeleteAccount();
    userActions.setUser(null);
  };

  const readUserFromStorage = async () => {
    await userStorage.getUser().then(user => {
      if (user) {
        logger('readUserFromStorage').info(user);
        userActions.setUser(user);
      }
    });
  };

  return {
    getUser: userActions.getUser,
    setLoggedUser,
    loginUser,
    registerUser,
    logoutUser,
    updateUserDisplayName,
    updateUserPassword,
    deleteUserAccount,
    readUserFromStorage,
  };
};
