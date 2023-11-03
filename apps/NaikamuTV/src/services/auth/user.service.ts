import { logger } from '../../utils';
import { fireGetUser, fireLogoutUser } from '../firebase';

import { userStorage } from './user.storage';
import { useUserStore } from './user.store';

export const useUserService = () => {
  const userActions = useUserStore(state => state.actions);

  const setLoggedUser = async () => {
    const user = fireGetUser();

    userActions.setUser(user);
    await userStorage.saveUser(user);
  };

  const logoutUser = async () => {
    await fireLogoutUser();
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
    logoutUser,
    readUserFromStorage,
  };
};
